import React from 'react';
import { Button } from './button';
import { useTheme } from '../../contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { applyThemedHover, removeThemedHover } from './themedHover';

interface Props {
  onClick?: () => void;
  className?: string;
}

export function BackButton({ onClick, className }: Props) {
  const { currentTheme } = useTheme();

  const defaultBg = currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)';

  return (
    <div className={className}>
      <Button
        onClick={onClick}
        className="rounded-full px-4 py-2 flex items-center"
        style={{
          background: defaultBg,
          color: currentTheme.textColor,
          border: `2px solid ${currentTheme.accentColor}`,
        }}
        onMouseEnter={(e) => applyThemedHover(e, currentTheme, defaultBg)}
        onMouseLeave={(e) => removeThemedHover(e, currentTheme)}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back
      </Button>
    </div>
  );
}

export default BackButton;
