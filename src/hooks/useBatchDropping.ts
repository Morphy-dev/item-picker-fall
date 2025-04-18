
import { useEffect, useRef } from 'react';
import { GameState } from '@/types/game';
import { GameAction } from '@/contexts/game/gameActions';

export function useBatchDropping(state: GameState, dispatch: React.Dispatch<GameAction>) {
  const singleDropTimerRef = useRef<NodeJS.Timeout | null>(null);
  const doubleDropTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!state.isGameStarted || state.isGameOver) {
      // Clear timers when game is over or not started
      if (singleDropTimerRef.current) clearInterval(singleDropTimerRef.current);
      if (doubleDropTimerRef.current) clearInterval(doubleDropTimerRef.current);
      return;
    }

    // Drop a single item every 3 seconds
    singleDropTimerRef.current = setInterval(() => {
      if (state.currentBatchIndex < state.batches.length - 1) {
        dispatch({ type: 'DROP_NEXT_ITEM' });
      }
    }, 3000);

    // Drop two items every 6 seconds
    doubleDropTimerRef.current = setInterval(() => {
      if (state.currentBatchIndex < state.batches.length - 1) {
        dispatch({ type: 'DROP_TWO_ITEMS' });
      }
    }, 6000);

    return () => {
      if (singleDropTimerRef.current) clearInterval(singleDropTimerRef.current);
      if (doubleDropTimerRef.current) clearInterval(doubleDropTimerRef.current);
    };
  }, [state.isGameStarted, state.isGameOver, state.currentBatchIndex, state.batches.length, dispatch]);
}
