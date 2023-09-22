import { useState } from "react";

// import './index.css';

const useWordle = (solution, solutions) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  const [guesses, setGuesses] = useState([]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string

  const [isCorrect, setIsCorrect] = useState(false);

  const [usedKeys, setUsedKeys] = useState({});
  const [currentError, setCurrentError] = useState("");
  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    // Check if the guessed word is an exact match to solution
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key.toLowerCase()] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key.toLowerCase()] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key.toLowerCase()] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // Only add guess if turn is less than 6
      if (turn >= 6) {
        console.log("You used all your guesses!");
        return;
      }
      // Do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("You already tried that word.");
        setCurrentError("You already tried that word.");
        return;
      }
      // Check word is exactly 5 characters
      if (currentGuess.length !== 5) {
        console.log("Word must be 5 characters.");
        setCurrentError("Word must be 5 characters.");

        return;
      }
      if (!solutions.includes(currentGuess.toLowerCase())) {
        console.log("Word is not on the list");
        setCurrentError("Word is not on the list.");

        return;
      }
      // If all conditions are met, proceed to add the guess
      const formatted = formatGuess();
      addNewGuess(formatted);
      setCurrentGuess(""); // Clear the current guess for the next input
      setCurrentError("");
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  console.log("Current Guess:", currentGuess);
  console.log("Turn:", turn);

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    currentError,
    handleKeyup,
  };
};

export default useWordle;
