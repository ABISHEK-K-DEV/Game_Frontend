import React from 'react';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Guessing Number Game</h1>
      <Game />
      <hr className="my-6" />
      <Leaderboard />
    </div>
  );
}

export default App;
