
import React, { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import FallingItem from './FallingItem';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const GameScreen: React.FC = () => {
  const { state, startGame, resetGame } = useGame();
  const { 
    items, 
    score, 
    goodItemsCollected, 
    totalItems, 
    goodItems,
    remainingItems, 
    isGameOver, 
    isGameStarted 
  } = state;

  // Force reflow on game reset to restart animations
  useEffect(() => {
    if (!isGameStarted && items.length === 0) {
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        // Force reflow
        void gameContainer.offsetWidth;
      }
    }
  }, [isGameStarted, items.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-game-bg-start to-game-bg-end">
      {/* Game HUD */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-black/30 backdrop-blur-sm text-white">
        <div className="container max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">
              Score: {score}
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <div className="flex justify-between text-sm">
                <span>Good Items: {goodItemsCollected}/{goodItems}</span>
                <span>Remaining: {remainingItems}/{totalItems}</span>
              </div>
              <Progress 
                value={(goodItemsCollected / goodItems) * 100} 
                className="h-2 bg-white/20" 
                indicatorClassName="bg-game-good" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        id="game-container"
        className="relative w-full h-full"
      >
        {isGameStarted && !isGameOver && items.map((item) => (
          <FallingItem key={item.id} item={item} />
        ))}
      </div>

      {/* Start/Game Over Overlay */}
      {(!isGameStarted || isGameOver) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white animate-fade-in">
          <div className="animate-scale-up text-center p-6 bg-black/40 rounded-xl max-w-md">
            <h1 className="text-4xl font-bold mb-4">
              {isGameOver ? 'Game Over!' : 'Item Catcher'}
            </h1>
            
            {isGameOver ? (
              <div className="mb-6">
                <p className="text-xl mb-2">
                  {goodItemsCollected === goodItems 
                    ? 'Amazing! You caught all the good items!' 
                    : `You caught ${goodItemsCollected} of ${goodItems} good items.`}
                </p>
                <p className="text-2xl font-bold">Final Score: {score}</p>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-xl">
                  Catch the good items (fruits) and avoid the bad ones!
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  There are {goodItems} good items out of {totalItems} total items.
                </p>
              </div>
            )}
            
            <Button 
              onClick={isGameOver ? resetGame : startGame}
              className="bg-game-good hover:bg-game-good/80 text-white px-8 py-4 text-lg rounded-full"
            >
              {isGameOver ? 'Play Again' : 'Start Game'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
