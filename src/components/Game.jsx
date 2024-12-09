import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [computerNumber, setComputerNumber] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessesCount, setGuessesCount] = useState(0);
  const [startTime, setStartTime] = useState(null);

  
  const generateRandomNumber = () => {
    let digits = [];
    while (digits.length < 4) {
      const digit = Math.floor(Math.random() * 10);
      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }
    return digits.join('');
  };

 
  const startGame = () => {
    const number = generateRandomNumber();
    setComputerNumber(number);
    setGameStarted(true);
    setGuessesCount(0);
    setFeedback('');
    setStartTime(Date.now());
    console.log(`Generated Number: ${number}`); 
  };

  
  const handleGuess = () => {
    if (guess.length !== 4) {
      setFeedback('Please enter a 4-digit number.');
      return;
    }

    let plus = 0;
    let minus = 0;

    for (let i = 0; i < 4; i++) {
      if (guess[i] === computerNumber[i]) {
        plus++;
      } else if (computerNumber.includes(guess[i])) {
        minus++;
      }
    }

    setGuessesCount(guessesCount + 1);

    if (plus === 4) {
      submitResult();
    } else {
      setFeedback(`Feedback: ${'+'.repeat(plus)}${'-'.repeat(minus)}`);
    }
  };

  
  const submitResult = async () => {
    const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);

    try {
        const response = await axios.post('http://localhost:7000/api/game/submit', { 
            playerName,
            guesses: guessesCount + 1,
            timeInSeconds,
        });
        setFeedback(`Congratulations ${playerName}! You guessed the number in ${guessesCount + 1} tries.`);
        setGameStarted(false);
        console.log(response.data); 
    } catch (err) {
        console.error('Error submitting result:', err.response ? err.response.data : err.message);
        setFeedback('Error submitting the result.');
    }
};

  return (
    <div className="p-6">
      {!gameStarted ? (
        <div>
          <h1 className="text-2xl mb-4">Guess the Number Game</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={startGame} className="bg-blue-500 text-white p-2">
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl mb-4">Good luck, {playerName}!</h2>
          <input
            type="text"
            placeholder="Enter your 4-digit guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="border p-2 mr-2"
            maxLength="4"
          />
          <button onClick={handleGuess} className="bg-green-500 text-white p-2">
            Submit Guess
          </button>
          <p className="mt-4">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Game;