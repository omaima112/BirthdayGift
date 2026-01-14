import React from 'react';
import { useTheme, ThemeType } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Palette } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme, themeType } = useTheme();

  const themeOptions: { type: ThemeType; label: string; emoji: string }[] = [
    { type: 'golden', label: 'Golden Glow', emoji: '✨' },
    { type: 'pink', label: 'Pink Dream', emoji: '💗' },
    { type: 'purple', label: 'Pop Crush', emoji: '💜' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Palette size={16} />
        <span className="text-xs">Theme</span>
      </div>
      {themeOptions.map((option) => (
        <Button
          key={option.type}
          onClick={() => setTheme(option.type)}
          variant={themeType === option.type ? 'default' : 'outline'}
          size="sm"
          className="justify-start text-xs transition-all hover:scale-105"
        >
          <span className="mr-2">{option.emoji}</span>
          {option.label}
        </Button>
      ))}
    </div>
  );
}
