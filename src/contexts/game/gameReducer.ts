
import { GameState } from '@/types/game';
import { GameAction } from './gameActions';
import { createGameSession, updateSessionHits } from './sessionHandlers';
import { generateItems } from './itemGenerators';
import { TOTAL_ITEMS, GOOD_ITEMS, MAX_ATTEMPTS } from './constants';

export const initialState: GameState = {
  items: [],
  activeItems: [],
  batches: [],
  currentBatchIndex: 0,
  score: 0,
  goodItemsCollected: 0,
  totalItems: TOTAL_ITEMS,
  goodItems: GOOD_ITEMS,
  remainingItems: TOTAL_ITEMS,
  isGameOver: false,
  isGameStarted: false,
  isStreamPaused: false,
  sessionId: null,
  attemptCount: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      createGameSession().then(sessionId => {
        if (sessionId) {
          console.log('Created session:', sessionId);
        }
      });

      return {
        ...state,
        isGameStarted: true,
        attemptCount: 0,
        goodItemsCollected: 0,
      };
    }

    case 'COLLECT_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.collected) return state;

      const newAttemptCount = state.attemptCount + 1;
      const goodItemsCollected = item.type === 'good' ? state.goodItemsCollected + 1 : state.goodItemsCollected;
      const isGameOver = newAttemptCount >= MAX_ATTEMPTS;

      if (isGameOver && goodItemsCollected > 0) {
        updateSessionHits(state.sessionId, goodItemsCollected);
      }

      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, collected: true } : item
        ),
        score: item.type === 'good' ? state.score + 10 : state.score - 5,
        goodItemsCollected,
        attemptCount: newAttemptCount,
        isGameOver,
      };
    }

    case 'MISS_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.missed || item.collected) return state;

      const newAttemptCount = state.attemptCount + 1;
      const isGameOver = newAttemptCount >= MAX_ATTEMPTS;

      if (isGameOver && state.goodItemsCollected > 0) {
        updateSessionHits(state.sessionId, state.goodItemsCollected);
      }

      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, missed: true } : item
        ),
        attemptCount: newAttemptCount,
        isGameOver,
      };
    }

    case 'GENERATE_ITEMS': {
      const { items, batches } = generateItems(state.totalItems, state.goodItems);
      
      return {
        ...state,
        items,
        batches,
        activeItems: batches[0] || [],
        currentBatchIndex: 0,
      };
    }

    case 'DROP_NEXT_ITEM': {
      const nextBatchIndex = state.currentBatchIndex + 1;
      if (nextBatchIndex >= state.batches.length) {
        return state;
      }

      const activeItemsCount = state.activeItems.filter(item => !item.collected && !item.missed).length;
      if (activeItemsCount >= 3) return state;

      return {
        ...state,
        activeItems: [
          ...state.activeItems.filter(item => !item.collected && !item.missed),
          ...state.batches[nextBatchIndex]
        ],
        currentBatchIndex: nextBatchIndex,
      };
    }

    case 'DROP_TWO_ITEMS': {
      const nextBatchIndex = state.currentBatchIndex + 1;
      if (nextBatchIndex >= state.batches.length - 1) {
        return state;
      }

      const activeItemsCount = state.activeItems.filter(item => !item.collected && !item.missed).length;
      if (activeItemsCount >= 3) return state;

      const newItems = state.batches.slice(nextBatchIndex, nextBatchIndex + 2).flat();

      return {
        ...state,
        activeItems: [
          ...state.activeItems.filter(item => !item.collected && !item.missed),
          ...newItems
        ].slice(0, 3),
        currentBatchIndex: nextBatchIndex + 1,
      };
    }

    case 'RESET_GAME':
      return {
        ...initialState,
        items: [],
        activeItems: [],
        batches: [],
      };

    case 'PAUSE_STREAM':
      return {
        ...state,
        isStreamPaused: true
      };

    case 'RESUME_STREAM':
      return {
        ...state,
        isStreamPaused: false
      };

    default:
      return state;
  }
}
