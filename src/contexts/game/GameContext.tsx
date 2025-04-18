
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState } from '@/types/game';
import { gameReducer, initialState } from './gameReducer';
import { GameAction } from './gameActions';
import { useItemGeneration } from '@/hooks/useItemGeneration';
import { useBatchDropping } from '@/hooks/useBatchDropping';
import { useGameOver } from '@/hooks/useGameOver';

const GameContext = createContext<{
  state: GameState;
  collectItem: (id: string) => void;
  missItem: (id: string) => void;
  startGame: () => void;
  resetGame: () => void;
} | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useItemGeneration(state, dispatch);
  useBatchDropping(state, dispatch);
  useGameOver(state);

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
