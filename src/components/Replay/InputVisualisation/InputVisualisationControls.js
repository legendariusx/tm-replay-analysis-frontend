import React from "react";
import { Button } from "@material-ui/core";

import "./InputVisualisationControls.scss";

const InputVisualisationControls = (props) => {
    const {
        currentTimestamp,
        isPlaying,
        replayLength,
        play,
        pause,
        skip,
        stop,
    } = props;

    return (
        <div className="iv-controls">
            <Button
                variant="contained"
                onClick={() => skip(-1000)}
                disabled={currentTimestamp === 0}
            >
                <i className="mdi mdi-skip-previous" />
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    if (!isPlaying) play();
                    else pause();
                }}
                disabled={currentTimestamp >= replayLength}
            >
                {!isPlaying ? (
                    <i className="mdi mdi-play" />
                ) : (
                    <i className="mdi mdi-pause" />
                )}
            </Button>
            <Button variant="contained" onClick={() => stop()}>
                <i className="mdi mdi-stop" />
            </Button>
            <Button
                variant="contained"
                onClick={() => skip(1000)}
                disabled={currentTimestamp >= replayLength}
            >
                <i className="mdi mdi-skip-next" />
            </Button>
        </div>
    );
};

export default InputVisualisationControls;
