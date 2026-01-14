import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import BackButton from './ui/BackButton';
import { useTheme } from '../contexts/ThemeContext';
import { ConfettiAnimation } from './ConfettiAnimation';
import { SparkleAnimation } from './SparkleAnimation';

interface SurpriseProps {
  onBack?: () => void;
}

export function SurprisePage({ onBack }: SurpriseProps) {
  const { currentTheme } = useTheme();

  useEffect(() => {
    // small side effect: play a tiny chime if allowed
    try {
      const audio = new Audio();
      audio.src = '';
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 -z-10" style={{ background: currentTheme.gradient }} />
      <SparkleAnimation />
      <ConfettiAnimation trigger={true} />
      <div className="absolute top-6 left-6 z-50">
        <BackButton onClick={() => (onBack ? onBack() : window.history.back())} />
      </div>
      <div className="max-w-3xl mx-auto p-8">
        <Card className="p-8 text-center space-y-6" style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)' }}>
          <h2 className="text-5xl" style={{ fontFamily: 'var(--font-heading)', color: currentTheme.textColor }}>Surprise! 🎉</h2>
          <p style={{ color: currentTheme.textColor, opacity: 0.85 }}>You found a secret page — enjoy a little confetti and good vibes.</p>
          <div className="flex items-center justify-center space-x-3">
            <Button onClick={onBack} style={{ border: `2px solid ${currentTheme.accentColor}`, color: currentTheme.textColor }}>Back Home</Button>
            <Button onClick={() => window.alert('You unlocked a secret message! ❤️')} style={{ background: currentTheme.gradient, color: currentTheme.type === 'pink' ? '#493267' : '#fff' }}>Reveal</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SurprisePage;
