import React from 'react';
import WaterDropCatcher88 from './src/games/WaterDropCatcher88';

const GamePage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-black/80 border-b border-cyan-500/30 p-4">
        <button 
          onClick={() => window.location.hash = '/'}
          className="btn btn-ghost text-cyan-400"
        >
          ← Back
        </button>
      </div>

      {/* Game Component */}
      <div className="flex justify-center items-center min-h-screen pt-16">
        <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-lg shadow-xl">
          <WaterDropCatcher88 />
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-black/80 border-t border-cyan-500/30 p-4 text-center">
        <p className="text-cyan-400 text-sm">Use mouse, touch, WASD, or tilt device to play</p>
      </div>
    </div>
  );
};

export default GamePage;
