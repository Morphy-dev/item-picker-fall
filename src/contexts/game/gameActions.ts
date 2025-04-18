
import { Item } from '@/types/game';

// Define the weather items that will be used in the game
export const weatherItems = [
  { name: 'Sun', icon: '☀️' }, // Good item
  { name: 'Rain', icon: '🌧️' },
  { name: 'Storm', icon: '⛈️' },
  { name: 'Snow', icon: '❄️' },
  { name: 'Fog', icon: '🌫️' },
  { name: 'Wind', icon: '💨' },
  { name: 'Cloud', icon: '☁️' },
];

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'GENERATE_ITEMS' }
  | { type: 'COLLECT_ITEM'; id: string }
  | { type: 'MISS_ITEM'; id: string }
  | { type: 'DROP_NEXT_ITEM' }
  | { type: 'DROP_TWO_ITEMS' }
  | { type: 'PAUSE_STREAM' }
  | { type: 'RESUME_STREAM' }
  | { type: 'SET_SESSION_ID'; sessionId: string | null };
