import { Item } from '@/types/game';
import { weatherItems } from './gameActions';
import { FALL_SPEED } from './constants';

export function generateItems(totalItems: number, goodItems: number): {
  items: Item[],
  batches: Item[][]
} {
  const goodItemsList = Array.from({ length: goodItems }, (_, i) => ({
    id: `good-${i}`,
    type: 'good' as const,
    x: Math.random() * 80 + 10,
    speed: FALL_SPEED,
    collected: false,
    missed: false,
    icon: weatherItems[0].icon,
    name: weatherItems[0].name
  }));

  const badItems = Array.from({ length: totalItems - goodItems }, (_, i) => {
    const badItemIndex = 1 + (i % (weatherItems.length - 1));
    return {
      id: `bad-${i}`,
      type: 'bad' as const,
      x: Math.random() * 80 + 10,
      speed: FALL_SPEED,
      collected: false,
      missed: false,
      icon: weatherItems[badItemIndex].icon,
      name: weatherItems[badItemIndex].name
    };
  });

  const allItems = [...goodItemsList, ...badItems];
  for (let i = allItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
  }

  const batches: Item[][] = [];
  let currentIndex = 0;
  
  while (currentIndex < allItems.length) {
    batches.push([allItems[currentIndex]]);
    currentIndex++;
  }

  return { items: allItems, batches };
}
