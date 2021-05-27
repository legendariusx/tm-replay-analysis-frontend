import React from 'react';

import './SteeringDisplay.scss';

const SteeringDisplay = ({ direction, steeringPercentage }) => {
    let style;

    if (direction === "right") style = { borderLeftWidth: `${steeringPercentage}px` }
    else style = { borderRightWidth: `${steeringPercentage}px` }

    return (
        <>
            <div className={`iv-${direction}-bg`}></div>
            <div
                className={`iv-${direction}`}
                style={style}
            ></div>
        </>
    )
}

export default SteeringDisplay;