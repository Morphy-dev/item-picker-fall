
import React, { useEffect } from 'react';
import { useGame } from '@/contexts/game/GameContext';
import FallingItem from './FallingItem';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePlayInstructions } from '@/hooks/usePlayInstructions';
import { Check, X } from 'lucide-react';
import { MAX_ATTEMPTS } from '@/contexts/game/constants';

const GameScreen: React.FC = () => {
  const { state, startGame, resetGame } = useGame();
  const { 
    activeItems, 
    score,
    goodItemsCollected,
    totalItems,
    goodItems,
    remainingItems,
    isGameOver,
    isGameStarted,
    attemptCount
  } = state;

  const remainingChoices = MAX_ATTEMPTS - attemptCount;

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
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-2 text-white">
            <div>Score: {score}</div>
            <div>Choices remaining: {remainingChoices}/10</div>
          </div>
          <Progress 
            value={(goodItemsCollected / goodItems) * 100} 
            className="h-2 bg-white/20" 
          />
        </div>
      </div>

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

      <Dialog open={isGameOver} onOpenChange={() => {}}>
        <DialogContent className="bg-white/10 backdrop-blur-md border-none text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Your Results!</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Hits</span>
                <div className="flex items-center gap-2">
                  <span>{goodItemsCollected}</span>
                  <Check className="text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Mistakes</span>
                <div className="flex items-center gap-2">
                  <span>{attemptCount - goodItemsCollected}</span>
                  <X className="text-red-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Score</span>
                <span>{score}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameScreen;
