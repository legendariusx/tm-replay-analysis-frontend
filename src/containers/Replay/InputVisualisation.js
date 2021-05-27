import React from "react";
import { connect } from "react-redux";

import "./InputVisualisation.scss";

import TimeDisplay from "../../components/InputVisualisation/TimeDisplay";
import SteeringDisplay from "../../components/InputVisualisation/SteeringDisplay";
import InputVisualisationControls from "../../components/InputVisualisation/InputVisualisationControls";

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

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.skip = this.skip.bind(this);

        this.updateInputs = this.updateInputs.bind(this);
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
            slowDownPercentage: 0,
        });
    }

    skip(amount) {
        if (amount > 0) {
            this.updateInputs(
                this.state.currentTimestamp + amount >= this.props.replay.length
                    ? this.props.replay.length
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
        if (currentTimestamp >= this.props.replay.length) {
            this.pause();
            this.setState({
                currentTimestamp: this.props.replay.length
            })
        }
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
        const {
            replay
        } = this.props;

        return (
            <div className="input-visualisation-container">
                <h3>
                    Input Visualisation
                </h3>
                <div className="input-visualisation">
                    {/* Left steering display */}
                    <SteeringDisplay
                        direction="left"
                        steeringPercentage={this.state.leftSteeringAmount}
                    />
                    {/* Acceleration display */}
                    <div
                        className={`iv-accelerate ${
                            this.state.isAccelerating
                                ? "iv-accelerate-accelerating"
                                : ""
                        }`}
                    ></div>
                    <div
                       className={`iv-accelerate-triangle ${
                        this.state.isAccelerating
                            ? "iv-accelerate-triangle-accelerating"
                            : ""
                        }`} 
                    >

                    </div>
                    {/* Brake display */}
                    <div
                        className={`iv-brake ${
                            this.state.isBraking ? "iv-brake-braking" : ""
                        }`}
                    ></div>
                    <div
                       className={`iv-brake-triangle ${
                        this.state.isBraking
                            ? "iv-brake-triangle-braking"
                            : ""
                        }`} 
                    ></div>
                    {/* Right steering display */}
                    <SteeringDisplay
                        direction="right"
                        steeringPercentage={this.state.rightSteeringAmount}
                    />
                </div>
                <TimeDisplay
                    currentTimestamp={this.state.currentTimestamp}
                    replayLength={replay.length}
                    updateInputs={this.updateInputs}
                />
                <InputVisualisationControls
                    currentTimestamp={this.state.currentTimestamp}
                    isPlaying={this.state.isPlaying}
                    replayLength={replay.length}
                    play={this.play}
                    pause={this.pause}
                    skip={this.skip}
                    stop={this.stop}
                />
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
