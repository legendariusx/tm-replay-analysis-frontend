import React, { useRef } from "react";
import moment from "moment";

import "./TimeDisplay.scss";

const TimeDisplay = ({ currentTimestamp, replayLength, updateInputs }) => {
    const trackRef = useRef(null);

    function handleTrackMouseDown(event) {
        handleMouseMove(event);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    // Calculates relative distance from start to click and returns the new timestamp value
    function calculateSeek(event) {
        const { x } = trackRef.current.getBoundingClientRect();
        const clickX = event.pageX - Math.floor(x);
        const percent = clickX / trackRef.current.offsetWidth;
        // Since the game runs on 100 ticks, we need to make sure that the timestamp we return % 10 = 0
        // If we were to return 3 for example, the steering display would not work anymore
        const newTimestamp = Math.round(Math.min(replayLength / 10, Math.max(0, replayLength * percent)) / 10) * 10;
        return newTimestamp
    }

    function handleMouseMove(event) {
        updateInputs(calculateSeek(event));
    }

    function handleMouseUp(event) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        updateInputs(calculateSeek(event));
    }

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
        <div className="iv-time-display" onMouseDown={(ev) => handleTrackMouseDown(ev)} ref={trackRef}>
            <p>
                {`${moment(currentTimestamp).format(getFormat())} / ${moment(replayLength).format(getFormat())}`}
            </p>
            <div className="iv-time-display-progress" style={{ width: `${currentTimestamp / replayLength * 100}%` }}></div>
        </div>
    );
};

export default TimeDisplay;
