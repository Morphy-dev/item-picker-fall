
import { useEffect, useState } from 'react';
import { weatherItems } from '@/contexts/game/gameActions';

const AUDIO_URLS = {
  instruction: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/select%20the%20sunny%20day.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3Mvc2VsZWN0IHRoZSBzdW5ueSBkYXkubXAzIiwiaWF0IjoxNzQ0OTg4MDA5LCJleHAiOjE3NDU1OTI4MDl9.PKcIbuSl8SKeH74JI5X0XdlaMtFMNXOFQwEoeWWhVUY',
  select: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/is%20it%20a%20sunny%20day.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvaXMgaXQgYSBzdW5ueSBkYXkubXAzIiwiaWF0IjoxNzQ0OTg1MjA2LCJleHAiOjE3NDU1OTAwMDZ9.U51qAGK1Cf-_6QRpybh3FjZNNEJgLUFM8Xa6fZ4r-Cg',
  correct: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/Yaiiii.wav?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvWWFpaWlpLndhdiIsImlhdCI6MTc0NDk4NTQwOCwiZXhwIjoxNzQ1NTkwMjA4fQ.svkZONFVz2eL-HfbcF0pAkQNimPupzYXC70nPwG6_Ko',
  wrong: 'https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/audios/Oh%20No.wav?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpb3MvT2ggTm8ud2F2IiwiaWF0IjoxNzQ0OTg1NDIyLCJleHAiOjE3NDU1OTAyMjJ9.RZgp5uqY-QbLog1YC2glPHHXu4Z5K_BntmA_kZ1Dnlk'
};

export const usePreloadResources = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = weatherItems.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = item.icon;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      return Promise.all(imagePromises);
    };

    const preloadAudios = async () => {
      const audioPromises = Object.values(AUDIO_URLS).map((url) => {
        return new Promise((resolve, reject) => {
          const audio = new Audio();
          audio.src = url;
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
        });
      });

      return Promise.all(audioPromises);
    };

    Promise.all([preloadImages(), preloadAudios()])
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Error preloading resources:', error);
        setIsLoading(false);
      });
  }, []);

  return { isLoading };
};
