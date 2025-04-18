
import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { GameState, Item } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

// Icons for our items
const goodIcons = ['🍎', '🍓', '🍉', '🍊', '🥝', '🍇', '🍈', '🍌', '🍍', '🥭'];
const badIcons = ['💣', '🧨', '🦠', '🕷️', '🕸️', '🔥', '⚡', '☠️', '🗑️', '🚫'];

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'COLLECT_ITEM'; id: string }
  | { type: 'MISS_ITEM'; id: string }
  | { type: 'GENERATE_ITEMS' }
  | { type: 'DROP_NEXT_BATCH' }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  items: [],
  activeItems: [],
  batches: [],
  currentBatchIndex: 0,
  score: 0,
  goodItemsCollected: 0,
  totalItems: 50,
  goodItems: 10,
  remainingItems: 50,
  isGameOver: false,
  isGameStarted: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isGameStarted: true,
      };
    case 'COLLECT_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.collected) return state;

      const newScore = item.type === 'good' ? state.score + 10 : state.score - 5;
      const goodItemsCollected = item.type === 'good' ? state.goodItemsCollected + 1 : state.goodItemsCollected;
      const remainingItems = state.remainingItems - 1;
      const isGameOver = remainingItems === 0 || goodItemsCollected === state.goodItems;

      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, collected: true } : item
        ),
        score: newScore,
        goodItemsCollected,
        remainingItems,
        isGameOver,
      };
    }
    case 'MISS_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.missed || item.collected) return state;

      const remainingItems = state.remainingItems - 1;
      const goodItemsMissed = item.type === 'good' ? 1 : 0;
      const isGameOver = remainingItems === 0 || state.goodItems - state.goodItemsCollected - goodItemsMissed < 0;

      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, missed: true } : item
        ),
        remainingItems,
        isGameOver,
      };
    }
    case 'GENERATE_ITEMS': {
      // Create array of good and bad items
      const goodItems = Array.from({ length: state.goodItems }, (_, i) => ({
        id: `good-${i}`,
        type: 'good' as const,
        x: Math.random() * 80 + 10,
        speed: Math.random() * 2 + 5, // 5-7 seconds fall duration
        collected: false,
        missed: false,
        icon: goodIcons[i % goodIcons.length],
      }));

      const badItems = Array.from({ length: state.totalItems - state.goodItems }, (_, i) => ({
        id: `bad-${i}`,
        type: 'bad' as const,
        x: Math.random() * 80 + 10,
        speed: Math.random() * 2 + 5, // 5-7 seconds fall duration
        collected: false,
        missed: false,
        icon: badIcons[i % badIcons.length],
      }));

      // Combine and shuffle all items
      const allItems = [...goodItems, ...badItems];
      for (let i = allItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
      }

      // Create batches of 2-3 items
      const batches: Item[][] = [];
      let currentIndex = 0;
      
      while (currentIndex < allItems.length) {
        const batchSize = Math.floor(Math.random() * 2) + 2; // Random size between 2-3
        batches.push(allItems.slice(currentIndex, Math.min(currentIndex + batchSize, allItems.length)));
        currentIndex += batchSize;
      }

      return {
        ...state,
        items: allItems,
        batches,
        activeItems: batches[0] || [], // Start with the first batch
        currentBatchIndex: 0,
      };
    }
    case 'DROP_NEXT_BATCH': {
      const nextBatchIndex = state.currentBatchIndex + 1;
      if (nextBatchIndex >= state.batches.length) {
        return state;
      }

      // Add next batch to active items
      return {
        ...state,
        activeItems: [...state.activeItems.filter(item => !item.collected && !item.missed), ...state.batches[nextBatchIndex]],
        currentBatchIndex: nextBatchIndex,
      };
    }
    case 'RESET_GAME':
      return {
        ...initialState,
        items: [],
        activeItems: [],
        batches: [],
      };
    default:
      return state;
  }
}

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

  // Generate items when game starts
  useEffect(() => {
    if (state.isGameStarted && state.items.length === 0) {
      dispatch({ type: 'GENERATE_ITEMS' });
    }
  }, [state.isGameStarted]);

  // Drop next batch when current batch is processed
  useEffect(() => {
    if (!state.isGameStarted || state.isGameOver) return;
    
    // Check if current batch is all collected or missed
    const currentBatchIsProcessed = state.activeItems.length > 0 && 
      state.activeItems.every(item => item.collected || item.missed);
    
    // Check if we need to drop the next batch
    const shouldDropNextBatch = 
      (currentBatchIsProcessed || state.activeItems.length === 0) && 
      state.currentBatchIndex < state.batches.length - 1;
    
    if (shouldDropNextBatch) {
      const timer = setTimeout(() => {
        dispatch({ type: 'DROP_NEXT_BATCH' });
      }, 1000); // Wait 1 second before dropping next batch
      
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
