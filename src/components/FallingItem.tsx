import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Item } from '@/types/game';
import { useGame } from '@/contexts/game/GameContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface FallingItemProps {
  item: Item;
}

const FallingItem: React.FC<FallingItemProps> = ({ item }) => {
  const { collectItem, missItem, pauseStream, resumeStream } = useGame();
  const { playSequentialSounds } = useSoundEffects();
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    if (!item.collected && !item.missed) {
      pauseStream();
      await playSequentialSounds(['select', item.type === 'good' ? 'correct' : 'wrong']);
      collectItem(item.id);
      resumeStream();
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
        "absolute cursor-pointer transform transition-transform",
        "animate-fall hover:scale-125",
        "motion-reduce:transition-none motion-reduce:hover:transform-none"
      )}
      style={{
        left: `${item.x}%`,
        '--fall-duration': `${item.speed}s`,
        transition: 'transform 0.2s ease-in-out',
      } as React.CSSProperties}
      onClick={handleClick}
    >
      <img 
        src={item.icon} 
        alt={item.name}
        className="w-16 h-16 object-contain"
      />
    </div>
  );
};

export default FallingItem;
