
import { useEffect } from 'react';
import { GameState } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

export function useGameOver(state: GameState) {
  const { toast } = useToast();

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
}
