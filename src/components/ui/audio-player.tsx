import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
  defaultUrl?: string;
}

export default function AudioPlayer({ defaultUrl }: Props) {
  const { currentTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    audio.addEventListener('timeupdate', onTime);
    return () => audio.removeEventListener('timeupdate', onTime);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="w-full p-3 rounded-lg" style={{ background: currentTheme.type === 'purple' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)', border: `1px solid ${currentTheme.accentColor}30` }}>
      <audio ref={audioRef} src={defaultUrl} preload="auto" />
      <div className="flex items-center justify-between">
        <button onClick={toggle} className="px-4 py-2 rounded-full" style={{ background: currentTheme.gradient, color: currentTheme.type === 'pink' ? '#493267' : '#fff' }}>{playing ? 'Pause' : 'Play'}</button>
        <div className="flex-1 mx-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div style={{ width: `${progress}%`, height: '100%', background: currentTheme.gradient }} />
          </div>
        </div>
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} style={{ accentColor: currentTheme.accentColor }} />
      </div>
    </div>
  );
}
