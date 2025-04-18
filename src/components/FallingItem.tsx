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
      
      // Pause all falling animations
      document.querySelectorAll('.animate-fall').forEach((el) => {
        el.classList.add('animate-pause');
      });

      // Play sounds and handle completion
      playSequentialSounds(['select', item.type === 'good' ? 'correct' : 'wrong'])
        .then(() => {
          setIsDisappearing(true);
          setTimeout(() => {
            collectItem(item.id);
            // Resume animations for other items
            document.querySelectorAll('.animate-fall').forEach((el) => {
              el.classList.remove('animate-pause');
            });
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
        "absolute cursor-pointer transform transition-all duration-300",
        "animate-fall hover:scale-110",
        isSelected ? "fixed inset-0 m-auto w-16 h-16 z-50" : "", 
        isDisappearing ? "opacity-0" : "",
        "motion-reduce:transition-none motion-reduce:hover:transform-none"
      )}
      style={{
        left: isSelected ? undefined : `${item.x}%`,
        top: isSelected ? undefined : '-100px',
        transform: isSelected ? 'scale(2)' : 'none',
        animationDuration: `${FALL_SPEED}s`,
        transitionProperty: isSelected ? 'opacity, transform' : 'transform',
        transitionDuration: isSelected ? '0.5s' : '0.3s'
      }}
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
