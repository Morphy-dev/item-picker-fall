
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
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
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  items: [],
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
      const item = state.items.find((item) => item.id === action.id);
      if (!item || item.collected) return state;

      const newScore = item.type === 'good' ? state.score + 10 : state.score - 5;
      const goodItemsCollected = item.type === 'good' ? state.goodItemsCollected + 1 : state.goodItemsCollected;
      const remainingItems = state.remainingItems - 1;
      const isGameOver = remainingItems === 0 || goodItemsCollected === state.goodItems;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, collected: true } : item
        ),
        score: newScore,
        goodItemsCollected,
        remainingItems,
        isGameOver,
      };
    }
    case 'MISS_ITEM': {
      const item = state.items.find((item) => item.id === action.id);
      if (!item || item.missed || item.collected) return state;

      const remainingItems = state.remainingItems - 1;
      const goodItemsMissed = item.type === 'good' ? 1 : 0;
      const isGameOver = remainingItems === 0 || state.goodItems - state.goodItemsCollected - goodItemsMissed < 0;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, missed: true } : item
        ),
        remainingItems,
        isGameOver,
      };
    }
    case 'GENERATE_ITEMS': {
      // Create an array of good and bad items
      const goodItems = Array.from({ length: state.goodItems }, (_, i) => ({
        id: `good-${i}`,
        type: 'good' as const,
        x: Math.random() * 80 + 10, // Random position (10-90%)
        speed: Math.random() * 3 + 2, // Random speed (2-5s)
        collected: false,
        missed: false,
        icon: goodIcons[i % goodIcons.length],
      }));

      const badItems = Array.from({ length: state.totalItems - state.goodItems }, (_, i) => ({
        id: `bad-${i}`,
        type: 'bad' as const,
        x: Math.random() * 80 + 10, // Random position (10-90%)
        speed: Math.random() * 3 + 2, // Random speed (2-5s)
        collected: false,
        missed: false,
        icon: badIcons[i % badIcons.length],
      }));

      // Combine and shuffle items
      const items = [...goodItems, ...badItems];
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }

      return {
        ...state,
        items,
      };
    }
    case 'RESET_GAME':
      return {
        ...initialState,
        items: [],
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

  useEffect(() => {
    if (state.isGameStarted && state.items.length === 0) {
      dispatch({ type: 'GENERATE_ITEMS' });
    }
  }, [state.isGameStarted]);

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
