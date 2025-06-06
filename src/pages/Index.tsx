
import React from 'react';
import { GameProvider } from '@/contexts/game/GameContext';
import GameScreen from '@/components/GameScreen';

const Index = () => {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
};

export default Index;
