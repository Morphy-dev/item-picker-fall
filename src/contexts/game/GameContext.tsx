
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState } from '@/types/game';
import { gameReducer, initialState } from './gameReducer';
import { GameAction } from './gameActions';
import { useItemGeneration } from '@/hooks/useItemGeneration';
import { useBatchDropping } from '@/hooks/useBatchDropping';
import { useGameOver } from '@/hooks/useGameOver';
import { createGameSession } from './sessionHandlers';

const GameContext = createContext<{
  state: GameState;
  collectItem: (id: string) => void;
  missItem: (id: string) => void;
  startGame: () => void;
  resetGame: () => void;
  pauseStream: () => void;
  resumeStream: () => void;
} | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useItemGeneration(state, dispatch);
  useBatchDropping(state, dispatch);
  useGameOver(state);

  // Create a session when the game starts
  useEffect(() => {
    if (state.isGameStarted && !state.sessionId) {
      createGameSession().then(sessionId => {
        if (sessionId) {
          console.log('Created session with ID:', sessionId);
          dispatch({ type: 'SET_SESSION_ID', sessionId });
          dispatch({ type: 'GENERATE_ITEMS' });
        }
      });
    }
  }, [state.isGameStarted, state.sessionId]);

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

  const pauseStream = () => {
    dispatch({ type: 'PAUSE_STREAM' });
  };

  const resumeStream = () => {
    dispatch({ type: 'RESUME_STREAM' });
  };

  return (
    <GameContext.Provider value={{ 
      state, 
      collectItem, 
      missItem, 
      startGame, 
      resetGame,
      pauseStream,
      resumeStream
    }}>
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
