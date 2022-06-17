import React from "react";

export default function Die(props) {
    return (
        <div
            className="die"
            onClick={() => props.handleClick(props.id)}>
            {props.value}
        </div>
    )
}