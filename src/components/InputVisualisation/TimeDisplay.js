import React from "react";
import moment from "moment";

import "./TimeDisplay.scss";

const TimeDisplay = ({ currentTimestamp, replayLength }) => {
    const getFormat = () => {
        if (replayLength >= 60 * 60 * 1000) {
            return "HH:mm:ss.SS"
        }
        else if(replayLength >= 60 * 1000) {
            return "mm:ss.SS"
        }
        else {
            return "ss.SS"
        }
    }

    return (
        <div className="iv-time-display">
            <p>
                {`${moment(currentTimestamp).format(getFormat())} / ${moment(replayLength).format(getFormat())}`}
            </p>
            <div className="iv-time-display-progress" style={{ width: `${currentTimestamp / replayLength * 100}%` }}></div>
        </div>
    );
};

export default TimeDisplay;
