
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Item } from '@/types/game';
import { useGame } from '@/contexts/game/GameContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { FALL_SPEED } from '@/contexts/game/constants';

interface FallingItemProps {
  item: Item;
}

const FallingItem: React.FC<FallingItemProps> = ({ item }) => {
  const { collectItem, missItem, pauseStream, resumeStream } = useGame();
  const { playSequentialSounds } = useSoundEffects();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  const handleClick = () => {
    if (!item.collected && !item.missed) {
      setIsSelected(true);
      pauseStream();
      
      // Play sounds and handle completion
      playSequentialSounds(['select', item.type === 'good' ? 'correct' : 'wrong'])
        .then(() => {
          // After sounds complete, start disappearing
          setIsDisappearing(true);
          setTimeout(() => {
            collectItem(item.id);
            resumeStream();
          }, 500); // Match the fade-out animation duration
        });
    }
  };

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const handleAnimationEnd = () => {
      if (!item.collected && !isSelected) {
        missItem(item.id);
      }
    };

    element.addEventListener('animationend', handleAnimationEnd);
    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [item, missItem, isSelected]);

  if (item.collected || item.missed) return null;

  return (
    <div
      ref={itemRef}
      className={cn(
        "absolute cursor-pointer transform transition-all",
        !isSelected && "animate-fall hover:scale-[2]", // Increased scale from 110% to 200%
        isSelected && "fixed inset-0 flex items-center justify-center z-50", 
        isDisappearing && "opacity-0",
        "motion-reduce:transition-none motion-reduce:hover:transform-none"
      )}
      style={{
        left: isSelected ? '50%' : `${item.x}%`,
        top: isSelected ? '50%' : '-100px',
        transform: isSelected ? 'translate(-50%, -50%) scale(3)' : 'none', // Increased scale from 2 to 3
        animationDuration: `${FALL_SPEED}s`,
        animationPlayState: isSelected ? 'paused' : 'running',
        transition: isSelected 
          ? 'opacity 0.5s, transform 0.3s' 
          : 'transform 0.3s'
      }}
      onClick={handleClick}
    >
      <img 
        src={item.icon} 
        alt={item.name}
        className="w-24 h-24 object-contain" // Increased from w-16 h-16 to w-24 h-24
      />
    </div>
  );
};

export default FallingItem;
