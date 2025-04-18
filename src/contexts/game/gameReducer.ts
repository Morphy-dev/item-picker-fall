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
      // Create a new session immediately and wait for it before proceeding
      return {
        ...state,
        isGameStarted: true,
        attemptCount: 0,
        goodItemsCollected: 0,
      };
    }

    case 'SET_SESSION_ID': {
      // This action is dispatched after a session is created
      return {
        ...state,
        sessionId: action.sessionId
      };
    }

    case 'COLLECT_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.collected) return state;

      // Increment attempt count for any item collection (user's choice)
      const newAttemptCount = state.attemptCount + 1;
      
      // Only increment goodItemsCollected if the item is good
      const newGoodItemsCollected = item.type === 'good' ? state.goodItemsCollected + 1 : state.goodItemsCollected;
      
      // Game is over when user has made exactly 10 choices
      const isGameOver = newAttemptCount >= MAX_ATTEMPTS;

      // Update session hits if the item is good (immediately, not just at game over)
      if (item.type === 'good' && state.sessionId) {
        updateSessionHits(state.sessionId, newGoodItemsCollected);
        console.log(`Updated session hits: ${newGoodItemsCollected} for session ${state.sessionId}`);
      }

      // Additionally, update final hits count when game is over
      if (isGameOver && newGoodItemsCollected > 0 && state.sessionId) {
        updateSessionHits(state.sessionId, newGoodItemsCollected);
        console.log(`Final update - session hits: ${newGoodItemsCollected} for session ${state.sessionId}`);
      }

      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, collected: true } : item
        ),
        score: item.type === 'good' ? state.score + 10 : state.score - 5,
        goodItemsCollected: newGoodItemsCollected,
        attemptCount: newAttemptCount,
        isGameOver,
      };
    }

    case 'MISS_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.missed || item.collected) return state;

      // Don't count missed items toward the attempt count anymore
      // Simply mark them as missed without affecting the game state otherwise
      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, missed: true } : item
        ),
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
