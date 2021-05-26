import React from "react";
import { CircularProgress } from "@material-ui/core";

import "./DefaultDeterminateSpinner.scss";

export const DefaultDeterminateSpinner = ({ isUpload, progress }) => {
    return (
        <div className="default-spinner-container">
            <CircularProgress
                variant="determinate"
                color="secondary"
                size={100}
                value={progress}
            />
            <p>{isUpload ? "Uploading..." : "Downloading..."}</p>
        </div>
    );
};
