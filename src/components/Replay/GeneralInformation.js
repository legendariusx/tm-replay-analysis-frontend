import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from "@material-ui/core";
import React from "react";
import moment from "moment";

import "./GeneralInformation.scss";

const GeneralInformation = (props) => {
    const { replay } = props;
    console.log(
        "🚀 ~ file: GeneralInformation.js ~ line 7 ~ GeneralInformation ~ replay",
        replay
    );

    const getFormat = () => {
        if (replay.length >= 60 * 60 * 1000) {
            return "HH:mm:ss.SS"
        }
        else if(replay.length >= 60 * 1000) {
            return "mm:ss.SS"
        }
        else {
            return "ss.SS"
        }
    }

    return (
        <div className="general-information-container">
            <h3>General</h3>
            <div className="gi-table">
                <TableContainer className="general-information-table">
                    <Table>
                        <TableHead></TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Filename:</TableCell>
                                <TableCell>{replay.filename}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Race Time:</TableCell>
                                <TableCell>{moment(replay.length).format(getFormat())}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Username:</TableCell>
                                <TableCell>{replay.username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Respawns:</TableCell>
                                <TableCell>{replay.numOfRespawns}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Map UID:</TableCell>
                                <TableCell>{replay.mapUID}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default GeneralInformation;
