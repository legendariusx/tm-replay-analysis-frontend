import React from 'react';
import { connect } from 'react-redux';
import { useDropzone } from "react-dropzone";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";

import './ReplayUploader.scss';

import { UPLOAD_FILES } from "../../actions/backend";

const Dropzone = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: ".Replay.Gbx",
        maxSize: 100000,
        maxFiles: 5
    });

    const uploading = false;

    return (
        <div {...getRootProps()} className="drag-n-drop-container">
            <input {...getInputProps()} />
            <div>
                {
                    uploading ? 
                    <CircularProgress color="secondary" size={100} />
                    : (
                        <React.Fragment>
                            <p className="drag-n-drop-text">Upload Replay</p>
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    );
}

class ReplayUploader extends React.Component {
    constructor(props) {
        super(props);

        this.onFileDrop = this.onFileDrop.bind(this);
    }

    onFileDrop(acceptedFiles, rejectedFiles) {
        if (acceptedFiles.length >= 1)
            this.props.uploadFiles(acceptedFiles);
        if (rejectedFiles.length >= 1 && acceptedFiles.length === 5) {
            toast.error("File limit: 5")
        }
        else if (rejectedFiles.length === 1)
            toast.error("File could not be added!");
        
        else if (rejectedFiles.length > 1) {
            toast.error("Files could not be added!");
        }
    }

    render() {
        return (
            <div className="replay-uploader">
                <Dropzone onDrop={this.onFileDrop} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        backend: state.backend
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFiles: (files) => dispatch({ type: UPLOAD_FILES, value: files })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplayUploader);