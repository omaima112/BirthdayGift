import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { SparkleAnimation } from './SparkleAnimation';
import AncientLetter from './AncientLetter';
import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { currentTheme } = useTheme();
  const [showLetter, setShowLetter] = useState(false);

  const celebs = [
    { name: 'Billie Eilish', page: 'billie', emoji: '🎤' },
    { name: 'Sim Jake', page: 'jake', emoji: '⭐' },
    { name: 'Kim Jennie', page: 'jennie', emoji: '👑' },
    { name: 'Beomgyu', page: 'beomgyu', emoji: '🌟' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SparkleAnimation />
      
      <div
        className="absolute inset-0 animate-gradient -z-10"
        style={{ background: currentTheme.gradient }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full space-y-12 text-center">
          {/* Hero Section */}
          <div className="space-y-6 animate-float">
            <div className="flex justify-center">
              <Sparkles 
                size={48} 
                className="text-yellow-300 animate-pulse" 
                fill="currentColor"
              />
            </div>
            
            <h1
              className="text-5xl md:text-7xl"
              style={{
                fontFamily: 'var(--font-heading)',
                color: currentTheme.type === 'pink' ? '#493267' : currentTheme.type === 'purple' ? '#ffffff' : '#373854',
              }}
            >
              Happy Birthday Samal!
            </h1>

            <p
              className="text-xl md:text-2xl"
              style={{
                fontFamily: 'var(--font-body)',
                color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor,
                opacity: 0.9,
              }}
            >
              A special celebration just for you 💛✨
            </p>

            <div className="flex items-center justify-center gap-2 text-lg">
              <Heart className="text-red-400 animate-pulse" fill="currentColor" size={20} />
              <span style={{ color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor }}>
                Golden Brown Vibes
              </span>
              <Heart className="text-red-400 animate-pulse" fill="currentColor" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button
              onClick={() => setShowLetter(true)}
              className="h-12 rounded-2xl text-lg px-6 transition-all hover:scale-105"
              style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)', color: currentTheme.textColor, border: `2px solid ${currentTheme.accentColor}40` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = currentTheme.gradient; e.currentTarget.style.color = currentTheme.type === 'pink' ? '#493267' : '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = currentTheme.textColor; }}
            >
              Read My Letter
            </Button>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-4">
            <h2
              className="text-2xl md:text-3xl mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor,
              }}
            >
              Explore Your Celeb Crush Pages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {celebs.map((celeb) => {
                  const buttonBg =
                    currentTheme.type === 'purple'
                      ? 'rgba(0, 0, 0, 0.45)'
                      : 'rgba(255, 255, 255, 0.9)';
                  const hoverTextColor = currentTheme.type === 'pink' ? '#493267' : '#ffffff';

                  return (
                    <Button
                      key={celeb.page}
                      onClick={() => onNavigate(celeb.page)}
                      className="h-20 rounded-2xl text-xl transition-all hover:scale-105 hover:shadow-2xl"
                      style={{
                        background: buttonBg,
                        color: currentTheme.textColor,
                        backdropFilter: 'blur(10px)',
                        border: `3px solid ${currentTheme.accentColor}40`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 30px ${currentTheme.buttonHover}`;
                        e.currentTarget.style.background = currentTheme.gradient;
                        e.currentTarget.style.color = hoverTextColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '';
                        e.currentTarget.style.background = buttonBg;
                        e.currentTarget.style.color = currentTheme.textColor;
                      }}
                    >
                      <span className="mr-3 text-2xl">{celeb.emoji}</span>
                      {celeb.name}
                    </Button>
                  );
                })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button
                onClick={() => onNavigate('match')}
                className="h-12 rounded-2xl text-lg px-6 transition-all hover:scale-105"
                style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)', color: currentTheme.textColor, border: `2px solid ${currentTheme.accentColor}40` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = currentTheme.gradient; e.currentTarget.style.color = currentTheme.type === 'pink' ? '#493267' : '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = currentTheme.textColor; }}
              >
                Celeb Match Game
              </Button>

              {/* Play button removed — audio controlled by sticky player */}
            </div>
          </div>

          {/* Footer Message */}
          <div
            className="mt-12 p-6 rounded-2xl backdrop-blur-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: `2px solid ${currentTheme.accentColor}40`,
            }}
          >
            <p
              className="text-lg italic"
              style={{
                color: currentTheme.type === 'purple' ? currentTheme.textColor : currentTheme.textColor,
              }}
            >
              "Each page has a special quiz and digital photocard gift just for you! 
              Click any button above to start exploring. Don't forget to try different themes! 🎨"
            </p>
          </div>
        </div>
        <AncientLetter isOpen={showLetter} onClose={() => setShowLetter(false)} />
      </div>
    </div>
  );
}
