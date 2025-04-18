
import { useEffect } from 'react';
import { GameState } from '@/types/game';
import { GameAction } from '@/contexts/game/gameActions';

export function useBatchDropping(state: GameState, dispatch: React.Dispatch<GameAction>) {
  useEffect(() => {
    if (!state.isGameStarted || state.isGameOver) return;
    
    const currentBatchIsProcessed = state.activeItems.length > 0 && 
      state.activeItems.every(item => item.collected || item.missed);
    
    const shouldDropNextBatch = 
      (currentBatchIsProcessed || state.activeItems.length === 0) && 
      state.currentBatchIndex < state.batches.length - 1;
    
    if (shouldDropNextBatch) {
      const timer = setTimeout(() => {
        dispatch({ type: 'DROP_NEXT_BATCH' });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [
    state.isGameStarted,
    state.isGameOver,
    state.activeItems,
    state.currentBatchIndex,
    state.batches.length,
    dispatch
  ]);
}
