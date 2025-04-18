
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Item } from '@/types/game';
import { useGame } from '@/contexts/game/GameContext';

interface FallingItemProps {
  item: Item;
}

const FallingItem: React.FC<FallingItemProps> = ({ item }) => {
  const { collectItem, missItem } = useGame();
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!item.collected && !item.missed) {
      collectItem(item.id);
    }
  };

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const handleAnimationEnd = () => {
      if (!item.collected) {
        missItem(item.id);
      }
    };

    element.addEventListener('animationend', handleAnimationEnd);
    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [item, missItem]);

  if (item.collected || item.missed) return null;

  return (
    <div
      ref={itemRef}
      className={cn(
        "absolute text-6xl cursor-pointer transform transition-transform",
        "animate-fall hover:scale-125",
        "motion-reduce:transition-none motion-reduce:hover:transform-none", // Add smooth motion
        item.collected && "animate-spin-fade"
      )}
      style={{
        left: `${item.x}%`,
        '--fall-duration': `${item.speed}s`,
        transition: 'transform 0.2s ease-in-out', // Smooth hover effect
      } as React.CSSProperties}
      onClick={handleClick}
    >
      <span className="inline-block">{item.icon}</span>
    </div>
  );
};

export default FallingItem;
