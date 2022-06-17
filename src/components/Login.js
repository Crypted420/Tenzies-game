import React from "react";

export default function Login(props) {
    // Generating buttons for difficulty
    const modeArray = ["easy", "medium", "hard"];
    const createModeElement = modeArray.map((element, index) => {
        return <button
            key={index}
            id={index}
            onClick={(e) => props.handleClick(e)}
        >{element}
        </button>
    })
    return (
        <section>
            <form onSubmit={(e) => props.handleClick(e)}>
                <label htmlFor="username">Username</label>
                <input
                    onChange={(e) => props.handleClick(e)} 
                    type="text" name="username" id="username"
                    placeholder="Enter your username"
                    maxLength={9}
                    required value={props.userData.username}
                />
                <p className="diff">
                    Difficulty
                    <span>(default easy)</span>
                </p>
                <div className="mode--container">
                    {createModeElement}
                </div>
            </form>
            <button className="btn" onClick={props.userPass}>Start</button>
        </section>
    )
}