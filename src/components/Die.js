import React from "react";

export default function Die(props) {
    const style = {
        background: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div
            style={style}
            className="die"
            onClick={() => props.handleClick(props.id)}>
            {props.value}
        </div>
    )
}