
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState } from '@/types/game';
import { useToast } from '@/hooks/use-toast';
import { gameReducer, initialState } from './gameReducer';
import { GameAction } from './gameActions';

const GameContext = createContext<{
  state: GameState;
  collectItem: (id: string) => void;
  missItem: (id: string) => void;
  startGame: () => void;
  resetGame: () => void;
} | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.isGameStarted && state.items.length === 0) {
      dispatch({ type: 'GENERATE_ITEMS' });
    }
  }, [state.isGameStarted]);

  useEffect(() => {
    if (!state.isGameStarted || state.isGameOver) return;
    
    const currentBatchIsProcessed = state.activeItems.length > 0 && 
      state.activeItems.every(item => item.collected || item.missed);
    
    const shouldDropNextBatch = 
      (currentBatchIsProcessed || state.activeItems.length === 0) && 
      state.currentBatchIndex < state.batches.length - 1;
    
    if (shouldDropNextBatch) {
      const timer = setTimeout(() => {
        dispatch({ type: 'DROP_NEXT_BATCH' });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [state.isGameStarted, state.isGameOver, state.activeItems, state.currentBatchIndex, state.batches.length]);

  useEffect(() => {
    if (state.isGameOver) {
      const message = state.goodItemsCollected === state.goodItems
        ? `You won! You collected all ${state.goodItems} good items.`
        : `Game Over! You collected ${state.goodItemsCollected} of ${state.goodItems} good items.`;
      
      toast({
        title: state.goodItemsCollected === state.goodItems ? "Victory!" : "Game Over!",
        description: message,
        duration: 5000,
      });
    }
  }, [state.isGameOver, state.goodItemsCollected, state.goodItems, toast]);

  const collectItem = (id: string) => {
    dispatch({ type: 'COLLECT_ITEM', id });
  };

  const missItem = (id: string) => {
    dispatch({ type: 'MISS_ITEM', id });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <GameContext.Provider value={{ state, collectItem, missItem, startGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
