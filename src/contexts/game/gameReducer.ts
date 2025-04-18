import { GameState, Item } from '@/types/game';
import { GameAction, weatherItems } from './gameActions';
import { supabase } from "@/integrations/supabase/client";

export const initialState: GameState = {
  items: [],
  activeItems: [],
  batches: [],
  currentBatchIndex: 0,
  score: 0,
  goodItemsCollected: 0,
  totalItems: 10,
  goodItems: 3,
  remainingItems: 10,
  isGameOver: false,
  isGameStarted: false,
  isStreamPaused: false,
  sessionId: null,
  attemptCount: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const createSession = async () => {
        const { data, error } = await supabase
          .from('another_weather_game')
          .insert([{ hits: 0 }])
          .select()
          .single();
        
        if (error) console.error('Error creating session:', error);
        return data?.id;
      };

      createSession().then(sessionId => {
        if (sessionId) {
          console.log('Created session:', sessionId);
        }
      });

      return {
        ...state,
        isGameStarted: true,
        attemptCount: 0,
      };
    }

    case 'COLLECT_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.collected) return state;

      const newAttemptCount = state.attemptCount + 1;
      const goodItemsCollected = item.type === 'good' ? state.goodItemsCollected + 1 : state.goodItemsCollected;
      const remainingItems = state.remainingItems - 1;
      const isGameOver = newAttemptCount >= 10;

      if (isGameOver) {
        supabase
          .from('another_weather_game')
          .update({ hits: goodItemsCollected })
          .eq('id', state.sessionId)
          .then(({ error }) => {
            if (error) console.error('Error updating session:', error);
          });
      }

      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, collected: true } : item
        ),
        score: item.type === 'good' ? state.score + 10 : state.score - 5,
        goodItemsCollected,
        remainingItems,
        attemptCount: newAttemptCount,
        isGameOver,
      };
    }

    case 'MISS_ITEM': {
      const item = state.activeItems.find((item) => item.id === action.id);
      if (!item || item.missed || item.collected) return state;

      const newAttemptCount = state.attemptCount + 1;
      const remainingItems = state.remainingItems - 1;
      const isGameOver = newAttemptCount >= 10;

      if (isGameOver) {
        supabase
          .from('another_weather_game')
          .update({ hits: state.goodItemsCollected })
          .eq('id', state.sessionId)
          .then(({ error }) => {
            if (error) console.error('Error updating session:', error);
          });
      }

      return {
        ...state,
        activeItems: state.activeItems.map((item) =>
          item.id === action.id ? { ...item, missed: true } : item
        ),
        remainingItems,
        attemptCount: newAttemptCount,
        isGameOver,
      };
    }

    case 'GENERATE_ITEMS': {
      const goodItems = Array.from({ length: state.goodItems }, (_, i) => ({
        id: `good-${i}`,
        type: 'good' as const,
        x: Math.random() * 80 + 10,
        speed: FALL_SPEED,
        collected: false,
        missed: false,
        icon: weatherItems[0].icon,
        name: weatherItems[0].name
      }));

      const badItems = Array.from({ length: state.totalItems - state.goodItems }, (_, i) => {
        const badItemIndex = 1 + (i % (weatherItems.length - 1)); // Skip first item (sunny) and cycle through others
        return {
          id: `bad-${i}`,
          type: 'bad' as const,
          x: Math.random() * 80 + 10,
          speed: FALL_SPEED,
          collected: false,
          missed: false,
          icon: weatherItems[badItemIndex].icon,
          name: weatherItems[badItemIndex].name
        };
      });

      const allItems = [...goodItems, ...badItems];
      for (let i = allItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
      }

      const batches: Item[][] = [];
      let currentIndex = 0;
      
      while (currentIndex < allItems.length) {
        batches.push([allItems[currentIndex]]);
        currentIndex++;
      }

      return {
        ...state,
        items: allItems,
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
