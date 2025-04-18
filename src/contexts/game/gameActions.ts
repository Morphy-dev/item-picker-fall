
import { Item } from '@/types/game';

// Define weather items with their images
export const weatherItems = [
  {
    name: 'Sunny',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/sunny.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9zdW5ueS5wbmciLCJpYXQiOjE3NDQ5OTIyODksImV4cCI6MTc0NTU5NzA4OX0.uoYKNxWySwsxYJoyI4l45o1y7V1sgYelxjMSHZaIEOk'
  },
  {
    name: 'Rainy',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/rainy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9yYWlueS5wbmciLCJpYXQiOjE3NDQ5OTIzMDYsImV4cCI6MTc0NTU5NzEwNn0.l2CFEv7Pcy62Q8P10LrqtgWV6_22brc0_tOzhLZfleA'
  },
  {
    name: 'Cloudy',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/cloudy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci9jbG91ZHkucG5nIiwiaWF0IjoxNzQ0OTkyMzE3LCJleHAiOjE3NDU1OTcxMTd9.8yviCXJowkdjP_AblRmAD8rRUKhGZZKrQcA8Nx1AuBU'
  },
  {
    name: 'Windy',
    icon: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/other/windy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvdGhlci93aW5keS5wbmciLCJpYXQiOjE3NDQ5OTIzMzIsImV4cCI6MTc0NTU5NzEzMn0.q-b9Qwd3ai6bhWm37cQOla8gIxrmGQCfsGr5CSrvdnI'
  }
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
