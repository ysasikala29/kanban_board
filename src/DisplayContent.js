import { useState, useEffect } from "react";
import React from 'react';
import Card from "./Card";
import "./DisplayContent.css"

export default function DisplayContent(props) {

    const [matrixData, setMatrixData] = useState([]);
    const [uniquePriorityValues, setUniquePriorityValues] = useState([]);
    const [uniqueStatusValues, setUniqueStatusValues] = useState([]);
    const [uniqueUserValues, setUniqueUserValues] = useState([]);
    const [uniqueValues, setUniqueValues] = useState([]);

    useEffect(() => {
        // This effect runs after the initial render
        setUniqueStatusValues([...new Set(props.tickets.map((item) => item.status))]);
        setUniqueUserValues([...new Set(props.tickets.map((item) => item.userId))]);
        setUniquePriorityValues([...new Set(props.tickets.map((item) => item.priority))]);
    }, [props.tickets]);

    useEffect(() => {
        const groupData = (uniqueValues, value) => {
            const rows = [];
            for (let i = 0; i < uniqueValues.length; i++) {
                const group = props.tickets.filter((item) => {
                    if (value === "status")
                        return item.status === uniqueValues[i];
                    else if (value === "priority")
                        return item.priority === uniqueValues[i];
                    else if (value === "user")
                        return item.userId === uniqueValues[i];
                    return false;
                });
    
                let sortedgrp = []
                if(props.order === "priority"){
                    sortedgrp = group.sort((a,b)=> b.priority-a.priority)
                    console.log("in prio")
                }
                else if(props.order === "title"){
                    sortedgrp = group.sort((a,b) => a.title.localeCompare(b.title))
                    console.log(sortedgrp)
                }
    
                console.log(sortedgrp)
                rows.push(group);
            }
            setMatrixData(rows);
            console.log(matrixData);
        };
        if (props.group === 'status') {
            groupData(uniqueStatusValues, "status")
            setUniqueValues(uniqueStatusValues)
        }
        else if (props.group === 'user') {
            groupData(uniqueUserValues, "user");
            setUniqueValues(uniqueUserValues)
        }
        else if (props.group === 'priority') {
            groupData(uniquePriorityValues, "priority")
            setUniqueValues(uniquePriorityValues)
        };
    }, [props.group, uniqueStatusValues, uniqueUserValues, uniquePriorityValues, props.order, props.tickets, matrixData]);

    return (
        <div>
            <div className="matrix-container">
                {matrixData.map((row, rowIndex) => (
                    <div key={rowIndex} className="matrix-row">
                        {props.group}: {uniqueValues[rowIndex]}
                        {row.map((item, itemIndex) => (
                            <div key={itemIndex} className="matrix-item">
                                <Card item={item} />
                            </div>

                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}