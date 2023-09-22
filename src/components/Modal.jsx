import React from "react";

export default function Modal({ isCorrect, solution, turn }) {
  console.log("Modal");

  // Define a function to reload the page
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the word in {turn} guesses</p>
          <button className="replayButton" type="submit" onClick={reloadPage}>
            Play Again
          </button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Unlucky!</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time</p>
          <button className="replayButton" type="submit" onClick={reloadPage}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
