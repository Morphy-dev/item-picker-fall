
import { useEffect, useRef } from 'react';
import { GameState } from '@/types/game';
import { GameAction } from '@/contexts/game/gameActions';

export function useBatchDropping(state: GameState, dispatch: React.Dispatch<GameAction>) {
  const singleDropTimerRef = useRef<NodeJS.Timeout | null>(null);
  const doubleDropTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!state.isGameStarted || state.isGameOver || state.isStreamPaused) {
      // Clear timers when game is over, not started, or paused
      if (singleDropTimerRef.current) clearInterval(singleDropTimerRef.current);
      if (doubleDropTimerRef.current) clearInterval(doubleDropTimerRef.current);
      return;
    }

    // Drop two items every 3 seconds (doubled from single item)
    singleDropTimerRef.current = setInterval(() => {
      if (state.currentBatchIndex < state.batches.length - 1) {
        dispatch({ type: 'DROP_TWO_ITEMS' });
      }
    }, 3000);

    // Drop four items every 6 seconds (doubled from two items)
    doubleDropTimerRef.current = setInterval(() => {
      if (state.currentBatchIndex < state.batches.length - 2) {
        // Drop twice to get 4 items
        dispatch({ type: 'DROP_TWO_ITEMS' });
        dispatch({ type: 'DROP_TWO_ITEMS' });
      }
    }, 6000);

    return () => {
      if (singleDropTimerRef.current) clearInterval(singleDropTimerRef.current);
      if (doubleDropTimerRef.current) clearInterval(doubleDropTimerRef.current);
    };
  }, [state.isGameStarted, state.isGameOver, state.isStreamPaused, state.currentBatchIndex, state.batches.length, dispatch]);
}
