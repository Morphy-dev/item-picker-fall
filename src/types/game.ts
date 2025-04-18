
export interface Item {
  id: string;
  type: 'good' | 'bad';
  x: number;
  speed: number;
  collected: boolean;
  missed: boolean;
  icon: string;
}

export interface GameState {
  items: Item[];
  score: number;
  goodItemsCollected: number;
  totalItems: number;
  goodItems: number;
  remainingItems: number;
  isGameOver: boolean;
  isGameStarted: boolean;
}
