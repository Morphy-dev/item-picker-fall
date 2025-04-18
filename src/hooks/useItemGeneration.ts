
import { useEffect } from 'react';
import { GameState } from '@/types/game';
import { GameAction } from '@/contexts/game/gameActions';

export function useItemGeneration(state: GameState, dispatch: React.Dispatch<GameAction>) {
  useEffect(() => {
    if (state.isGameStarted && state.items.length === 0) {
      dispatch({ type: 'GENERATE_ITEMS' });
    }
  }, [state.isGameStarted, state.items.length, dispatch]);
}
