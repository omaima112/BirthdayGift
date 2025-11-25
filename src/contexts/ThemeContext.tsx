import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeType = 'golden' | 'pink' | 'purple';

export interface Theme {
  name: string;
  type: ThemeType;
  gradient: string;
  accentColor: string;
  textColor: string;
  buttonHover: string;
}

export const themes: Record<ThemeType, Theme> = {
  golden: {
    name: 'Golden Glow',
    type: 'golden',
    gradient: 'linear-gradient(135deg, #e99c05 0%, #f4ae00 25%, #f8bf33 50%, #f8ce19 75%, #ffdc02 100%)',
    accentColor: '#ffdc02',
    textColor: '#373854',
    buttonHover: 'rgba(255, 220, 2, 0.3)',
  },
  pink: {
    name: 'Pink Dream',
    type: 'pink',
    gradient: 'linear-gradient(135deg, #e98ec0 0%, #efaad0 25%, #f4c7e0 50%, #fae3ef 75%, #ffffff 100%)',
    accentColor: '#fc71b2ff',
    textColor: '#493267',
    buttonHover: 'rgba(239, 170, 208, 0.3)',
  },
  purple: {
    name: 'Pop Crush',
    type: 'purple',
    gradient: 'linear-gradient(135deg, #efbbff 0%, #d896ff 25%, #be29ec 50%, #800080 75%, #660066 100%)',
    accentColor: '#800080',
    textColor: '#d833caff',
    buttonHover: 'rgba(128, 0, 128, 0.3)',
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (type: ThemeType) => void;
  themeType: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeType, setThemeType] = useState<ThemeType>('golden');

  const setTheme = (type: ThemeType) => {
    setThemeType(type);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: themes[themeType],
        setTheme,
        themeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
