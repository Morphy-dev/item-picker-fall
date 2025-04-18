
import { Item } from '@/types/game';

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
