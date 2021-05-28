import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
} from "@material-ui/core";

import "./Metrics.scss";
import AverageSteeringAmount from "./AverageSteeringAmount";
import DonadigoMethod from "./DonadigoMethod";

const DEFAULT_TIME_PERIOD = 1000;
const DEFAULT_NOISE_THRESHOLD = 2000;

const Metrics = (props) => {
    const { replay } = props;

    const [timePeriod, setTimePeriod] = useState(DEFAULT_TIME_PERIOD);
    const [noiseThreshold, setNoiseThreshold] = useState(
        DEFAULT_NOISE_THRESHOLD
    );

    const handleTimePeriodInput = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 0) return;

        setTimePeriod(value);
    };

    const handleNoiseThresholdInput = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 0) return;

        setNoiseThreshold(value);
    };

    /**
     * Partitions steering events by a time period into arrays
     * This method is taken straight from the original donadigo script, translated into JavaScript and refactored a bit
     * @returns {Array} of partitioned steering events
     */
    const partitionSteeringEvents = () => {
        let partitions = [];
        let currentPartition = [];
        let boundary = timePeriod;

        for (const ev of replay.inputs) {
            if (ev.action === "steer") currentPartition.push(ev.axis);

            let evTime = ev.timestamp ? ev.timestamp : ev.timestampStart;
            if (evTime % 10 === 5) evTime -= 65535;

            if (timePeriod !== -1 && evTime > boundary) {
                partitions.push(currentPartition);
                currentPartition = [];
                boundary += timePeriod;
            }
        }

        return partitions;
    };

    const partitions = partitionSteeringEvents();
    const data = {};

    return (
        <div className="metrics-container">
            <h4>Metrics</h4>
            <TableContainer className="metrics-table">
                <Table>
                    <TableHead></TableHead>
                    <TableBody>
                        <TableRow className="metrics-header">
                            <TableCell
                                align="center"
                                style={{ fontSize: "1.25rem" }}
                                colSpan="2"
                            >
                                Settings
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">
                                <TextField
                                    label="Time Period (ms)"
                                    type="number"
                                    defaultValue={DEFAULT_TIME_PERIOD}
                                    placeholder={DEFAULT_TIME_PERIOD}
                                    onInput={(e) => handleTimePeriodInput(e)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    label="Noise threshold"
                                    type="number"
                                    defaultValue={DEFAULT_NOISE_THRESHOLD}
                                    placeholder={DEFAULT_NOISE_THRESHOLD}
                                    onInput={(e) =>
                                        handleNoiseThresholdInput(e)
                                    }
                                />
                            </TableCell>
                        </TableRow>
                        <DonadigoMethod partitions={partitions} timePeriod={timePeriod} noiseThreshold={noiseThreshold} />
                        <AverageSteeringAmount partitions={partitions} timePeriod={timePeriod} noiseThreshold={noiseThreshold} />
                    </TableBody>
                    <TableFooter></TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Metrics;
