import React, { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SparkleAnimation } from './SparkleAnimation';

interface Props {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, children }: Props) {
  const { currentTheme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SparkleAnimation />
      <div className="absolute inset-0 animate-gradient -z-10" style={{ background: currentTheme.gradient }} />

      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-heading)', color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor }}>{title}</h1>
              {subtitle && (
                <p className="text-xl" style={{ color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor, opacity: 0.9 }}>{subtitle}</p>
              )}
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default PageHero;
