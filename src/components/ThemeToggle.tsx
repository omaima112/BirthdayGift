import React, { useRef, useState, useEffect } from 'react';
import { useTheme, ThemeType } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Palette, Menu, X } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme, themeType } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const themeOptions: { type: ThemeType; label: string; emoji: string }[] = [
    { type: 'golden', label: 'Golden Glow', emoji: '✨' },
    { type: 'pink', label: 'Pink Dream', emoji: '💗' },
    { type: 'purple', label: 'Pop Crush', emoji: '💜' },
  ];

  useEffect(() => {
    // Close on outside click
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (wrapRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div ref={wrapRef} className="fixed top-4 right-4 z-50">
      {/* Compact sandwich toggle button */}
      {!open && (
        <button
          aria-label="Open theme options"
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Expanded panel */}
      {open && (
        <div className="mt-2 w-44 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Palette size={16} />
              <span className="text-xs">Theme</span>
            </div>
            <button
              aria-label="Close theme options"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>

          {themeOptions.map((option) => (
            <Button
              key={option.type}
              onClick={() => {
                setTheme(option.type);
                setOpen(false);
              }}
              variant={themeType === option.type ? 'default' : 'outline'}
              size="sm"
              className="justify-start text-xs transition-all hover:scale-105"
            >
              <span className="mr-2">{option.emoji}</span>
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
