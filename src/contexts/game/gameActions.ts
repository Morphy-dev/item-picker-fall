export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'COLLECT_ITEM'; id: string }
  | { type: 'MISS_ITEM'; id: string }
  | { type: 'GENERATE_ITEMS' }
  | { type: 'DROP_NEXT_ITEM' }
  | { type: 'DROP_TWO_ITEMS' }
  | { type: 'RESET_GAME' };

// Icons for our items
export const goodIcons = ['🍎', '🍓', '🍉', '🍊', '🥝', '🍇', '🍈', '🍌', '🍍', '🥭'];
export const badIcons = ['💣', '🧨', '🦠', '🕷️', '🕸️', '🔥', '⚡', '☠️', '🗑️', '🚫'];
