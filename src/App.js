import React from "react";
import Login from "./components/Login";
import Die from "./components/Die";
import Top from "./components/Top";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // Getting  user data from login
  const [userData, setUserData] = React.useState({
    mode: "easy",
    username: "",
    clicked: "",
  });
  // Generating dice elements based on user option
  const number =
    userData.mode === "easy" ? 10 : userData.mode === "medium" ? 15 : 20;
  const [dice, setDice] = React.useState(generateDice(number));
  const [tenzies, setTenzies] = React.useState(false);
  // Setting the state of the roll
  const [rolls, setRolls] = React.useState(0);

  // States for best players of the game
  const [bestEasy, setBestEasy] = React.useState(
    JSON.parse(localStorage.getItem("bestEasy")) || "none"
  );

  const [bestMedium, setBestMedium] = React.useState(
    JSON.parse(localStorage.getItem("bestMedium")) || "none"
  );
  const [bestHard, setBestHard] = React.useState(
    JSON.parse(localStorage.getItem("best")) || "none"
  );

  const [userPass, setUserPass] = React.useState(false);

  // Ending the game
  React.useEffect(() => {
    const valueMaster = dice[0].value ? dice[0].value : "";
    const checkHeld = dice.every((element) => element.isHeld);
    const compare = dice.every((element) => element.value === valueMaster);
    if (compare && checkHeld) {
      setTenzies(true);
    }
  }, [dice]);

  // Function for authenticating user
  function userAuth(e) {
    e.preventDefault();
    const { name, value, nodeName, outerText } = e.target;
    setUserData((prev) => {
      return nodeName === "INPUT"
        ? { ...prev, [name]: value }
        : { ...prev, mode: outerText };
    });
  }
  function btnClick() {
    if (userData.username === "") {
      setUserPass(false);
    } else {
      setUserPass(true);
      setDice(generateDice(number));
    }
  }

  // Function for generating random numbers for unclicked dice
  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld
            ? { ...die }
            : { ...die, id: nanoid(), value: Math.ceil(Math.random() * 6) };
        })
      );
      setRolls(rolls + 1);
    } else {
      setRolls(0);
      saveBest();
      setTenzies(false);
      setDice(generateDice(number));
      setUserPass(false);
    }
  }

  // Function for holding dice
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // Function for generating dice
  function generateDice(number) {
    const diceArray = [];
    for (let i = 0; i < number; i++) {
      diceArray.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return diceArray;
  }

  // Saving best players. I wish i know i better way of doing this :(
  function saveBest() {
    const Data = {
      username: userData.username,
      rolls: rolls,
      mode: userData.mode,
    };

    if (userData.mode === "easy") {
      if (bestEasy !== "none") {
        if (rolls < bestEasy.rolls) {
          setBestEasy(Data);
          return localStorage.setItem("bestEasy", JSON.stringify(Data));
        } else {
          return setBestEasy((prev) => prev);
        }
      } else {
        return localStorage.setItem("bestEasy", JSON.stringify(Data));
      }
    } else if (userData.mode === "medium") {
      if (bestMedium !== "none") {
        if (rolls < bestMedium.rolls) {
          setBestMedium(Data);
          return localStorage.setItem("bestMedium", JSON.stringify(Data));
        } else {
          return setBestMedium((prev) => prev);
        }
      } else {
        return localStorage.setItem("bestMedium", JSON.stringify(Data));
      }
    } else {
      if (bestHard !== "none") {
        if (rolls < bestHard.rolls) {
          setBestHard(Data);
          return localStorage.setItem("bestHard", JSON.stringify(Data));
        } else {
          return setBestHard((prev) => prev);
        }
      } else {
        return localStorage.setItem("bestHard", JSON.stringify(Data));
      }
    }
  }

  // Creating random dice elements
  const createDice = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        handleClick={holdDice}
      />
    );
  });
  // const {width, height} = useWindowSize();
  return (
    <div>
      {/* Lofin screen */}
      {!userPass && (
        <Login handleClick={userAuth} userData={userData} userPass={btnClick} />
      )}
      {/* Top bar */}
      <Top
        playerData={[userData, rolls]}
        bestScore={[bestEasy, bestMedium, bestHard]}
      />
        {/* Tenzies container */}
      <main className="tenzies--container">
        {tenzies && <Confetti />}

        <h2 className="header">Tenzies</h2>
        <p className="rule">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice--container">{createDice}</div>
        
        <button className="btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>

      </main>
    </div>
  );
}
