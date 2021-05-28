import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { sum } from "lodash";

const AverageSteeringAmount = (props) => {
    const { partitions, timePeriod, noiseThreshold } = props;

    const getAverageSteeringAmountForPartitions = (partitions) => {
        let averageSteeringAmounts = [];

        for (const partition of partitions) {
            let steeringAmounts = [];

            for (let i = 1; i < partition.length; i++) {
                const diff = Math.abs(partition[i] - partition[i - 1]);
                // if (diff <= noiseThreshold) continue;
                steeringAmounts.push(diff);
            }

            if (steeringAmounts.length > 0) {
                const avgSteeringAmount =
                    sum(steeringAmounts) / steeringAmounts.length;
                averageSteeringAmounts.push(avgSteeringAmount);
            }
        }

        return averageSteeringAmounts;
    };

    const averageSteeringAmounts =
        getAverageSteeringAmountForPartitions(partitions);
    const avgSteeringAmount = (
        sum(averageSteeringAmounts) / averageSteeringAmounts.length
    ).toFixed(2);
    const maxAverageSteeringAmount = Math.max(
        ...averageSteeringAmounts
    ).toFixed(2);

    return (
        <>
            <TableRow className="metrics-header">
                <TableCell
                    align="center"
                    colSpan="2"
                    style={{ fontSize: "1.25rem" }}
                >
                    Average Steering Amount
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">
                    Average Steering Amount / {(timePeriod / 1000).toFixed(2)}s
                </TableCell>
                <TableCell align="center">
                    Max Average Steering in 1 Period
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">{avgSteeringAmount}</TableCell>
                <TableCell align="center">{maxAverageSteeringAmount}</TableCell>
            </TableRow>
        </>
    );
};

export default AverageSteeringAmount;
