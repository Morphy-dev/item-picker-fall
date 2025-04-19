
import React, { useEffect } from 'react';
import { useGame } from '@/contexts/game/GameContext';
import FallingItem from './FallingItem';
import { Button } from '@/components/ui/button';
import { usePlayInstructions } from '@/hooks/usePlayInstructions';
import { usePreloadResources } from '@/hooks/usePreloadResources';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ResultsModal from './ResultsModal';

declare global {
  interface Window {
    studentId?: string;
    studentSession?: string;
  }
}

const GameScreen: React.FC = () => {
  const { state, startGame, resetGame } = useGame();
  const { 
    activeItems, 
    isGameOver,
    isGameStarted,
    goodItemsCollected,
  } = state;
  const { isLoading } = usePreloadResources();

  usePlayInstructions(isGameStarted, state.items.length > 0);

  useEffect(() => {
    if (!isGameStarted && activeItems.length === 0) {
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        void gameContainer.offsetWidth;
      }
    }
  }, [isGameStarted, activeItems.length]);

  const handleNext = () => {
    window.parent.postMessage({ 
      type: "game_finished",
      data: {
        studentId: window.studentId,
        studentSession: window.studentSession
      }
    }, "*");
    resetGame();
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-neutral-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AspectRatio 
        ratio={16/9} 
        className="w-full max-w-[1152px] mx-auto bg-cover bg-center bg-no-repeat absolute inset-0"
        style={{ 
          backgroundImage: `url("https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/public/other/Semana01_Escena-06-v3.png")`
        }}
      />
      
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

      <ResultsModal 
        open={isGameOver}
        goodItemsCollected={goodItemsCollected}
        maxAttempts={10}
        onNext={handleNext}
      />
    </div>
  );
};

export default GameScreen;
