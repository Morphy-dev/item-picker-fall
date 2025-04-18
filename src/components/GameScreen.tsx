
import React, { useEffect } from 'react';
import { useGame } from '@/contexts/game/GameContext';
import FallingItem from './FallingItem';
import { Button } from '@/components/ui/button';
import { usePlayInstructions } from '@/hooks/usePlayInstructions';

const GameScreen: React.FC = () => {
  const { state, startGame, resetGame } = useGame();
  const { 
    activeItems, 
    isGameOver,
    isGameStarted,
  } = state;

  usePlayInstructions(isGameStarted, state.items.length > 0);

  useEffect(() => {
    if (!isGameStarted && activeItems.length === 0) {
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        void gameContainer.offsetWidth;
      }
    }
  }, [isGameStarted, activeItems.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-900">
      <div 
        id="game-container"
        className="relative w-full h-full"
      >
        {isGameStarted && !isGameOver && activeItems.map((item) => (
          <FallingItem key={item.id} item={item} />
        ))}
      </div>

      {(!isGameStarted || isGameOver) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-scale-up text-center p-6 bg-white/10 rounded-xl max-w-md backdrop-blur-md">
            <Button 
              onClick={isGameOver ? resetGame : startGame}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 text-lg rounded-full"
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

