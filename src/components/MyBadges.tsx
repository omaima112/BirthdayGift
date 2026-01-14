import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from './ui/card';
import { Button } from './ui/button';

export default function MyBadges({ onBack }: { onBack?: () => void }) {
  const { currentTheme } = useTheme();
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient -z-10" style={{ background: currentTheme.gradient }} />
      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center" style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: currentTheme.textColor }}>Badges Removed</h2>
            <p style={{ color: currentTheme.textColor, opacity: 0.85, marginTop: 8 }}>The badge feature has been removed. Quiz results are still available, but nothing is stored in localStorage.</p>
            <div className="mt-6">
              <Button onClick={() => (onBack ? onBack() : window.history.back())} style={{ background: currentTheme.gradient, color: currentTheme.type === 'pink' ? '#493267' : '#fff' }}>
                Go Back
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
