
import { useEffect, useRef } from 'react';

export function usePlayInstructions(isGameStarted: boolean, hasItems: boolean) {
  const instructionAudio = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isGameStarted && hasItems) {
      const playInstruction = () => {
        if (instructionAudio.current) {
          instructionAudio.current.play();
        }
      };

      instructionAudio.current = new Audio('https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/select%20the%20sunny%20day.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3Mvc2VsZWN0IHRoZSBzdW5ueSBkYXkubXAzIiwiaWF0IjoxNzQ0OTg4MDA5LCJleHAiOjE3NDU1OTI4MDl9.PKcIbuSl8SKeH74JI5X0XdlaMtFMNXOFQwEoeWWhVUY');
      playInstruction();

      // Play instruction every 4 seconds until first item is collected
      intervalRef.current = setInterval(playInstruction, 4000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (instructionAudio.current) {
          instructionAudio.current.pause();
          instructionAudio.current = null;
        }
      };
    }
  }, [isGameStarted, hasItems]);

  // Stop instruction repetition when first item is collected
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [hasItems]);
}
