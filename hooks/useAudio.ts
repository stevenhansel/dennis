import { useEffect, useState } from 'react';

const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    setAudio(new Audio(url))
  }, [])

  useEffect(() => {
    if (audio) {
        if (playing) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    }, [audio, playing]
  );

  useEffect(() => {
    if (audio) {
          audio.addEventListener('ended', () => setPlaying(false));

        return () => {
          audio.removeEventListener('ended', () => setPlaying(false));
        };
    }
  }, [audio]);

  return { playing, toggle };
};

export default useAudio;