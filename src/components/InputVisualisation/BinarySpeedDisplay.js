import React from "react";

import './BinarySpeedDisplay.scss';

const BinarySpeedDisplay = (props) => {
console.log('🚀 ~ file: BinarySpeedDisplay.js ~ line 6 ~ BinarySpeedDisplay ~ props', props)
    const {
        type,
        isOn
    } = props

    return (
        <>
            <div
                className={`iv-${type} ${
                    isOn
                        ? `iv-${type}-on`
                        : ""
                }`}
            ></div>
            <div
                className={`iv-${type}-triangle ${
                    isOn
                        ? `iv-${type}-triangle-on`
                        : ""
                }`}
            ></div>
        </>
    );
};

export default BinarySpeedDisplay;
