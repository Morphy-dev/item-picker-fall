
import { useCallback } from 'react';

const SOUND_URLS = {
  select: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/is%20it%20a%20sunny%20day.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvaXMgaXQgYSBzdW5ueSBkYXkubXAzIiwiaWF0IjoxNzQ0OTg1MjA2LCJleHAiOjE3NDU1OTAwMDZ9.U51qAGK1Cf-_6QRpybh3FjZNNEJgLUFM8Xa6fZ4r-Cg",
  correct: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/Yaiiii.wav?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvWWFpaWlpLndhdiIsImlhdCI6MTc0NDk4NTQwOCwiZXhwIjoxNzQ1NTkwMjA4fQ.svkZONFVz2eL-HfbcF0pAkQNimPupzYXC70nPwG6_Ko",
  wrong: "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/Oh%20No.wav?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvT2ggTm8ud2F2IiwiaWF0IjoxNzQ0OTg1NDIyLCJleHAiOjE3NDU1OTAyMjJ9.RZgp5uqY-QbLog1YC2glPHHXu4Z5K_BntmA_kZ1Dnlk"
} as const;

export const useSoundEffects = () => {
  const playSequentialSounds = useCallback(async (sounds: Array<keyof typeof SOUND_URLS>) => {
    for (const soundType of sounds) {
      const audio = new Audio(SOUND_URLS[soundType]);
      await audio.play();
      await new Promise(resolve => {
        audio.onended = resolve;
      });
    }
  }, []);

  return { playSequentialSounds };
};
