import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import AudioPlayer from './ui/audio-player';
import { useTheme } from '../contexts/ThemeContext';

import BackButton from './ui/BackButton';

interface PlaylistProps {
  onBack?: () => void;
  onSetTrack?: (url: string) => void;
}

const SAMPLE_TRACKS = [
  { id: 'track1', title: 'Chill Vibes', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'track2', title: 'Sunny Day', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'track3', title: 'Late Night', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export function Playlist({ onBack, onSetTrack }: PlaylistProps) {
  const { currentTheme } = useTheme();
  const [current, setCurrent] = useState(SAMPLE_TRACKS[0].url);

  const handleSet = (url: string) => {
    setCurrent(url);
    if (onSetTrack) onSetTrack(url);
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SparkleAnimation />
      <div className="absolute inset-0 animate-gradient -z-10" style={{ background: currentTheme.gradient }} />

      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid md:grid-cols-1 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-heading)', color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor }}>Your Playlist</h1>
              <p className="text-xl" style={{ color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor, opacity: 0.9 }}>Play one of the curated tracks below.</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <BackButton onClick={() => (onBack ? onBack() : window.history.back())} />
          </div>

          <div className="mx-auto max-w-3xl">
            <Card className="p-6" style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)' }}>
              <div className="grid gap-3">
                {SAMPLE_TRACKS.map((t) => (
                  <Button key={t.id} onClick={() => handleSet(t.url)} className="justify-between rounded-full px-6 py-3 text-left" style={{ background: currentTheme.type === 'purple' ? 'rgba(255,255,255,0.03)' : 'white', color: currentTheme.textColor, border: `2px solid ${currentTheme.accentColor}20` }} onMouseEnter={(e) => { e.currentTarget.style.background = currentTheme.gradient; e.currentTarget.style.color = currentTheme.type === 'pink' ? '#493267' : '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.background = currentTheme.type === 'purple' ? 'rgba(255,255,255,0.03)' : 'white'; e.currentTarget.style.color = currentTheme.textColor; }}>
                    <span>{t.title}</span>
                    <span className="opacity-70 text-sm">Play</span>
                  </Button>
                ))}

                <div className="mt-4">
                  <AudioPlayer defaultUrl={current} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
