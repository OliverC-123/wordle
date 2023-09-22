import React, { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

// start db server --MUST BE TERMINAL-- 'json-server --watch db.json --port 3001'

function App() {
  const [solution, setSolution] = useState(null);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the local JSON file
        const response = await fetch("http://localhost:3001/solutions"); // Relative path from App.js to db.json
        const json = await response.json();
  
        // Access the "Solutions" property to obtain the array of objects
        const solutionsArray = json;
  
        // Extract the "word" values into a new array
        const wordsArray = solutionsArray.map((solution) => solution.word);
  
        // Randomly select a word from the "wordsArray"
        const randomSolution =
          wordsArray[Math.floor(Math.random() * wordsArray.length)];
  
        // Set both "solution" and "solutionsArray" here
        setSolution(randomSolution);
        setSolutions(wordsArray);
      } catch (error) {
        console.error("Error loading JSON file:", error);
      }
    };
  
    fetchData();
  }, []);
  
  // // useEffect for randomSolution
  // useEffect(() => {
  //   fetch("http://localhost:3001/solutions")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       // Randomly select a solution
  //       const randomSolution = json[Math.floor(Math.random() * json.length)];

  //       // Set both solution and solutions here
  //       setSolution(randomSolution.word);
  //     });
  // }, [setSolution]);
  return (
    <div className="App">
      <h1 className="Wordle">Wordle</h1>
      {solution && <Wordle solution={solution} solutions={solutions} />}
    </div>
  );
}

export default App;
