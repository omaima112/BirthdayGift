import React, { useRef, useState, useEffect } from 'react';
import { useTheme, ThemeType, themes } from '../contexts/ThemeContext';
import { Palette, Menu, X, Check } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme, themeType, currentTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const themeOptions: { type: ThemeType; label: string; emoji: string }[] = [
    { type: 'golden', label: 'Golden Glow', emoji: '✨' },
    { type: 'pink', label: 'Pink Dream', emoji: '💗' },
    { type: 'purple', label: 'Pop Crush', emoji: '💜' },
  ];

  useEffect(() => {
    // Close on outside click or Escape key
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
    <div ref={wrapRef} className="fixed top-4 right-4 z-60 pointer-events-auto">
      {/* Collapsed button shows current theme swatch + menu icon */}
      {!open && (
        <button
          aria-label="Open theme options"
          aria-expanded={open}
          aria-controls="theme-panel"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(true); }}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center gap-2 px-2"
          title={`Theme: ${currentTheme.name}`}
        >
          <span
            aria-hidden
            className="w-4 h-4 rounded-full mr-1"
            style={{ background: currentTheme.gradient, boxShadow: `0 0 0 2px ${currentTheme.accentColor}22` }}
          />
          <Menu size={16} />
        </button>
      )}

      {/* Expanded panel */}
      {open && (
        <div id="theme-panel" role="menu" className="mt-2 w-48 flex flex-col gap-2 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border" style={{ borderColor: `${currentTheme.accentColor}22` }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Palette size={16} />
              <span className="text-xs font-medium">Theme</span>
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
            <button
              key={option.type}
              role="menuitem"
              onClick={() => {
                setTheme(option.type);
                setOpen(false);
              }}
              className={`flex items-center justify-between w-full px-2 py-2 rounded-md transition-colors ${themeType === option.type ? 'bg-[rgba(0,0,0,0.06)]' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full" style={{ background: themes[option.type].gradient }} />
                <div className="text-sm text-left">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.emoji}</div>
                </div>
              </div>
              <div>
                {themeType === option.type ? <Check size={16} /> : null}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
