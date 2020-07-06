import React, { useEffect, useRef } from "react";
import { useSelector } from 'react-redux'
import ChartLib from "chart.js";
import "./Chart.css";

const getConfig = (data) => {
    return {
        type: "bar",
        data: {
            labels: ["W - streamBandwidth ?", "Quality", "Buffering time", "Time progress"],
            datasets: [{
                label: "# value",
                data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
}

const Chart = () => {
    const canvasRef = useRef(null);
    const { streamBandwidth, quality, bufferingTime, timeProgress } = useSelector((state) => state.values);

    useEffect(() => {
      new ChartLib(canvasRef.current, getConfig([streamBandwidth, quality, bufferingTime, timeProgress]));
    }, [streamBandwidth, quality, bufferingTime, timeProgress]);

    return (
        <div className="chart-wrapper">
            <canvas ref={canvasRef} width="400" height="400"></canvas>
        </div>
    )
};

export default Chart;
