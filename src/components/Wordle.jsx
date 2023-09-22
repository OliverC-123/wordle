import React, { useState, useEffect } from "react";

import useWordle from "../hooks/useWordle";
import Grid from "./Grid";

import Keypad from "./Keypad";
import keys from "./Keys";

import Modal from "./Modal";

export default function Wordle({ solution, solutions }) {
  const [showModal, setShowModal] = useState(false);

  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    currentError,
    handleKeyup,
  } = useWordle(solution, solutions);

  // useEffect to monitor Keyup
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  // useEffect to monitor when game ends
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);
  {
    {
      showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      );
    }
  }

  return (
    <div>
      <h1>Current Guess - {currentGuess}</h1>
      <p>{currentError}</p>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad keys={keys} usedKeys={usedKeys} />
      {(isCorrect || turn === 6) && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
