import React from "react";

export default function Top(props) {
    const { bestScore } = props;
    return (
        <div className="top--container">
            <p className='rolls'>
                <span>Current user: {props.playerData[0].username}</span>
                <span>Rolls: {props.playerData[1]}</span>
            </p>
            
            <p className='score'>
                <span>Best Players</span>
                {
                    bestScore[0].mode === "easy" ?
                        <span>Esay: {bestScore[0].username}, {bestScore[0].rolls}rolls</span>
                        :
                        <span>Easy: No player yet</span>
                }
                {
                    bestScore[1].mode === "medium" ?
                        <span>Medium:{bestScore[1].username}, {bestScore[1].rolls}rolls</span>
                        :
                        <span>Medium: No player yet</span>
                }
                {
                    bestScore[2].mode === "hard" ?
                        <span>Hard: {bestScore[2].username}, {bestScore[2].rolls}rolls</span>
                        :
                        <span>Hard: No player yet</span>
                }
            </p>
        </div>
    )
}