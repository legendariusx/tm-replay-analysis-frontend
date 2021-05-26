import { Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

import "./InputVisualisation.scss";
import TimeDisplay from "../../components/InputVisualisation/TimeDisplay";

class InputVisualisation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            interval: null,
            currentTimestamp: 0,
            isAccelerating: false,
            isBraking: false,
            isSteeringRight: false,
            rightSteeringAmount: 0,
            isSteeringLeft: false,
            leftSteeringAmount: 0,
        };
    }

    play() {
        this.setState({
            isPlaying: true,
            interval: setInterval(
                () => this.updateInputs(this.state.currentTimestamp + 10),
                10
            ),
        });
    }

    pause() {
        clearInterval(this.state.interval);
        this.setState({
            isPlaying: false,
            interval: null,
            currentTimestamp: this.state.currentTimestamp + 10
        });
    }

    stop() {
        clearInterval(this.state.interval);
        this.setState({
            isPlaying: false,
            currentTimestamp: 0,
            interval: null,
            isAccelerating: false,
            isBraking: false,
            isSteeringRight: false,
            rightSteeringAmount: 0,
            isSteeringLeft: false,
            leftSteeringAmount: 0,
            slowDownPercentage: 0
        });
    }

    skip(amount) {
        if (amount > 0) {
            this.updateInputs(
                this.state.currentTimestamp + amount >= this.props.replay.length
                    ? this.props.replay.length - 1
                    : this.state.currentTimestamp + amount
            );
        } else {
            this.updateInputs(
                this.state.currentTimestamp + amount < 0
                    ? 0
                    : this.state.currentTimestamp + amount
            );
        }
    }

    updateInputs(currentTimestamp) {
        const inputs = this.props.replay.inputs;

        // Stop replay if end is reached
        if (currentTimestamp >= this.props.replay.length) this.pause();
        else {
            // Filters inputs for whether they're happening currently
            // If the input is a single action, the timestamp has to match exactly
            // For ranged actions, the timestamp has to be inbetween the start and end of the inputs action
            const currentInputs = inputs.filter((input) => {
                if (input.timestamp) {
                    return input.timestamp === currentTimestamp;
                } else {
                    return (
                        currentTimestamp >= input.timestampStart &&
                        currentTimestamp <= input.timestampStop
                    );
                }
            });

            // Filters inputs for steering
            const steeringInput = currentInputs.filter(
                (input) => input.action === "steer"
            )[0];

            let steeringValues = {};

            // If we are currently steering, calculate direction and amount of steering
            if (steeringInput) {
                const isSteeringRight = steeringInput.axis > 0;
                // Converts steering input to percentage of total steering
                const steeringPercentage =
                    (Math.abs(steeringInput.axis) / 65536) * 100;

                steeringValues = {
                    isSteeringRight: isSteeringRight,
                    rightSteeringAmount: isSteeringRight
                        ? steeringPercentage
                        : 0,
                    isSteeringLeft: !isSteeringRight,
                    leftSteeringAmount: !isSteeringRight
                        ? steeringPercentage
                        : 0,
                };
            }

            this.setState({
                currentTimestamp: currentTimestamp,
                isAccelerating: this.getIsPressingButton("up", currentInputs),
                isBraking: this.getIsPressingButton("down", currentInputs),
                ...steeringValues,
            });
        }
    }

    getIsPressingButton(key, inputs) {
        return inputs.filter((input) => input.key === key).length > 0;
    }

    render() {
        const replay = this.props.replay ? this.props.replay : {};

        return (
            <div className="input-visualisation-container">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Input Visualisation
                </h2>
                <TimeDisplay currentTimestamp={this.state.currentTimestamp} replayLength={replay.length} />
                <div className="iv-controls">
                    <Button
                        variant="contained"
                        onClick={() => this.skip(-1000)}
                        disabled={!this.props.replays.uploadSuccess || this.state.currentTimestamp === 0}
                    >
                        <i className="mdi mdi-skip-previous" />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (!this.state.isPlaying) this.play();
                            else this.pause();
                        }}
                        disabled={!this.props.replays.uploadSuccess || this.state.currentTimestamp >= replay.length - 10}
                    >
                        {!this.state.isPlaying ? (
                            <i className="mdi mdi-play" />
                        ) : (
                            <i className="mdi mdi-pause" />
                        )}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => this.stop()}
                        disabled={!this.props.replays.uploadSuccess}
                    >
                        <i className="mdi mdi-stop" />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => this.skip(1000)}
                        disabled={!this.props.replays.uploadSuccess || this.state.currentTimestamp >= replay.length - 10}
                    >
                        <i className="mdi mdi-skip-next" />
                    </Button>
                </div>
                <div className="input-visualisation">
                    {/* Left steering display */}
                    <div className="iv-left-bg"></div>
                    <div
                        className="iv-left"
                        style={{
                            borderRightWidth: `${this.state.leftSteeringAmount}px`,
                        }}
                    ></div>
                    {/* Acceleration display */}
                    <div
                        className={`iv-accelerate ${
                            this.state.isAccelerating
                                ? "iv-accelerate-accelerating"
                                : ""
                        }`}
                    ></div>
                    {/* Brake display */}
                    <div
                        className={`iv-brake ${
                            this.state.isBraking ? "iv-brake-braking" : ""
                        }`}
                    ></div>
                    {/* Right steering display */}
                    <div className="iv-right-bg"></div>
                    <div
                        className="iv-right"
                        style={{
                            borderLeftWidth: `${this.state.rightSteeringAmount}px`,
                        }}
                    ></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        replays: state.replays,
    };
};

export default connect(mapStateToProps)(InputVisualisation);
