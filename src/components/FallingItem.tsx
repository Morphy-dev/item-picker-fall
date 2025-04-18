
import React, { useEffect, useRef, useState } from 'react';
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
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!item.collected && !item.missed) {
      setIsSelected(true);
      pauseStream();
      
      // Play sounds and handle completion
      const sounds = ['select', item.type === 'good' ? 'correct' : 'wrong'];
      const audio = new Audio(sounds[0]);
      
      // First sound ended
      audio.onended = () => {
        const secondAudio = new Audio(sounds[1]);
        // Second sound ended
        secondAudio.onended = () => {
          setIsSelected(false);
          collectItem(item.id);
          resumeStream();
        };
        secondAudio.play();
      };
      
      audio.play();
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
        isSelected ? 
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-200 z-50" : 
          "animate-fall hover:scale-125",
        "motion-reduce:transition-none motion-reduce:hover:transform-none"
      )}
      style={{
        left: isSelected ? '50%' : `${item.x}%`,
        '--fall-duration': `${item.speed}s`,
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
