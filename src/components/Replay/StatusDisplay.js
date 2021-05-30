import React, { useState } from "react";

import "./StatusDisplay.scss";

const StatusDisplay = (props) => {
    const { status, error } = props;

    let icon;

    switch (status) {
        case "success":
            icon = <i className="mdi mdi-checkbox-marked-circle-outline" />;
            break;
        case "partial":
            icon = <i className="mdi mdi-checkbox-marked-circle-outline" />;
            break;
        case "failed":
            icon = <i className="mdi mdi-close-circle-outline" />;
            break;
        default:
            icon = null;
            break;
    }

    return (
        <>
            <div className={`status-display status-display-${status}`} >
                { icon }
                <div className="status-display-message">
                    { error ? error : 'Successfully extracted.' }
                </div>
            </div>
        </>
    );
};

export default StatusDisplay;
