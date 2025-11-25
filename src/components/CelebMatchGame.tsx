import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { SparkleAnimation } from './SparkleAnimation';
import BackButton from './ui/BackButton';
import { applyThemedHover, removeThemedHover } from './ui/themedHover';

interface MatchProps {
  onMatch?: (page: string) => void;
  onBack?: () => void;
}

const questions = [
  {
    q: 'Pick a weekend activity',
    options: ['Vibing to music', 'Hanging with friends', 'Styling outfits', 'Making jokes']
  },
  {
    q: 'Choose a color',
    options: ['Green/Black', 'Blue', 'Pink', 'Yellow']
  },
  {
    q: 'Favorite accessory',
    options: ['Oversized hoodie', 'Beanie', 'Designer bag', 'Cute pins']
  }
];

export function CelebMatchGame({ onMatch, onBack }: MatchProps) {
  const { currentTheme } = useTheme();
  const [answers, setAnswers] = useState<number[]>([]);

  const handlePick = (idx: number) => {
    setAnswers(prev => [...prev, idx]);
  };

  const computeResult = () => {
    // simple mapping by tally
    const tally = [0,0,0,0];
    answers.forEach(a => {
      tally[a] = (tally[a] || 0) + 1;
    });
    const maxIdx = tally.indexOf(Math.max(...tally));
    const mapping = ['billie','jake','jennie','beomgyu'];
    return mapping[maxIdx] || 'billie';
  };

  if (answers.length >= questions.length) {
    const match = computeResult();
    return (
      <div className="min-h-screen relative overflow-hidden">
        <SparkleAnimation />
        <div className="absolute inset-0 animate-gradient -z-10" style={{ background: currentTheme.gradient }} />

        <div className="relative z-10 min-h-screen px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid md:grid-cols-1 gap-8 items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-heading)', color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor }}>Celeb Match</h1>
                <p className="text-xl" style={{ color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor, opacity: 0.9 }}>Which celeb are you most like?</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <BackButton onClick={() => (onBack ? onBack() : window.history.back())} />
            </div>

            <div className="mx-auto max-w-3xl">
              <Card className="p-8 text-center" style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)' }}>
                <h3 className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: currentTheme.textColor }}>You matched with...</h3>
                <p className="text-4xl mt-4" style={{ color: currentTheme.textColor }}>{match.toUpperCase()}</p>
                <div className="mt-6 flex justify-center space-x-3">
                  <Button onClick={() => onMatch ? onMatch(match) : window.alert(`Go to ${match}`)} style={{ background: currentTheme.gradient, color: currentTheme.type === 'pink' ? '#493267' : '#fff' }}>See their page</Button>
                  <Button onClick={() => setAnswers([])} style={{ border: `2px solid ${currentTheme.accentColor}`, color: currentTheme.textColor }}>Try Again</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[answers.length];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SparkleAnimation />
      <div className="absolute inset-0 animate-gradient -z-10" style={{ background: currentTheme.gradient }} />

      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="mx-auto max-w-3xl">
            <Card className="p-6 space-y-4" style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)' }}>
              <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)', color: currentTheme.textColor }}>{q.q}</h3>
              <div className="grid gap-3">
                {q.options.map((opt, i) => (
                  <Button
                    key={i}
                    onClick={() => handlePick(i)}
                    className="rounded-full px-6 py-3 text-left"
                    style={{
                      background: currentTheme.type === 'purple' ? 'rgba(255,255,255,0.03)' : 'white',
                      color: currentTheme.textColor,
                      border: `2px solid ${currentTheme.accentColor}20`,
                    }}
                    onMouseEnter={(e) => applyThemedHover(e, currentTheme, currentTheme.type === 'purple' ? 'rgba(255,255,255,0.03)' : 'white')}
                    onMouseLeave={(e) => removeThemedHover(e, currentTheme)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CelebMatchGame;
