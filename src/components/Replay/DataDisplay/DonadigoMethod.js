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
import React, { useState } from "react";
import { sum } from "lodash";

import "./DonadigoMethod.scss";

const DonadigoMethod = (props) => {
    const { partitions, timePeriod, noiseThreshold } = props;

    /**
     * Analyzes steering inputs and calculates average spikes / second and max spikes / second
     * This method is taken straight from the original donadigo script, translated into JavaScript and refactored a bit
     * @returns {Object} with avgSpikes and maxSpikes
     */
    const getSpikesFromPartitions = (partitions) => {
        let spikes = [];

        for (const partition of partitions) {
            let numOfSpikes = -1;
            let spikeDir = 0;

            for (let i = 1; i < partition.length; i++) {
                const diff = partition[i] - partition[i - 1];
                if (Math.abs(diff) <= noiseThreshold) continue;

                if (diff > 0 && spikeDir !== 1) {
                    spikeDir = 1;
                    numOfSpikes += 1;
                } else if (diff < 0 && spikeDir !== -1) {
                    spikeDir = -1;
                    numOfSpikes += 1;
                }
            }

            spikes.push(Math.max(0, numOfSpikes));
        }

        return spikes;
    };

    /**
     * Analyzes steering inputs and calculates average spikes / second and max spikes / second
     * This method is taken straight from the original donadigo script, translated into JavaScript and refactored a bit
     * @returns {Object} with avgSpikes and maxSpikes
     */
    const getAverageSpikesAndMaxSpikes = (partitions) => {
        const spikes = getSpikesFromPartitions(partitions);

        let maxSpikes;
        if (spikes.length === 0) maxSpikes = 0;
        else maxSpikes = Math.max(...spikes);

        const avgSpikes = (sum(spikes) / spikes.length).toFixed(2);

        return {
            maxSpikes: maxSpikes,
            avgSpikes: avgSpikes,
        };
    };

    const data = getAverageSpikesAndMaxSpikes(partitions);

    return (
        <>
            <TableRow className="metrics-header">
                <TableCell
                    align="center"
                    colSpan="2"
                    style={{ fontSize: "1.25rem" }}
                >
                    Donadigo / Wirtual Method
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">
                    Average Spikes / {(timePeriod / 1000).toFixed(2)}s
                </TableCell>
                <TableCell align="center">Maximum Spikes in 1 Period</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">{data.avgSpikes}</TableCell>
                <TableCell align="center">{data.maxSpikes}</TableCell>
            </TableRow>
        </>
    );
};

export default DonadigoMethod;
