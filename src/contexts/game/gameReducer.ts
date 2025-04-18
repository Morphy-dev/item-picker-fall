import { GameState, Item } from '@/types/game';
import { GameAction } from './gameActions';
import { goodIcons, badIcons } from './gameActions';

export const initialState: GameState = {
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

const FALL_SPEED = 8; // Constant fall speed in seconds

export function gameReducer(state: GameState, action: GameAction): GameState {
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
      const goodItems = Array.from({ length: state.goodItems }, (_, i) => ({
        id: `good-${i}`,
        type: 'good' as const,
        x: Math.random() * 80 + 10,
        speed: FALL_SPEED, // Use constant speed instead of random
        collected: false,
        missed: false,
        icon: goodIcons[i % goodIcons.length],
      }));

      const badItems = Array.from({ length: state.totalItems - state.goodItems }, (_, i) => ({
        id: `bad-${i}`,
        type: 'bad' as const,
        x: Math.random() * 80 + 10,
        speed: FALL_SPEED, // Use constant speed instead of random
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
        const batchSize = Math.floor(Math.random() * 2) + 2;
        batches.push(allItems.slice(currentIndex, Math.min(currentIndex + batchSize, allItems.length)));
        currentIndex += batchSize;
      }

      return {
        ...state,
        items: allItems,
        batches,
        activeItems: batches[0] || [],
        currentBatchIndex: 0,
      };
    }

    case 'DROP_NEXT_BATCH': {
      const nextBatchIndex = state.currentBatchIndex + 1;
      if (nextBatchIndex >= state.batches.length) {
        return state;
      }

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
