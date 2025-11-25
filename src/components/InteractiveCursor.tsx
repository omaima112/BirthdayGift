import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function InteractiveCursor() {
  const { currentTheme } = useTheme();

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 150ms ease, height 150ms ease, background 150ms ease, opacity 150ms ease;
        z-index: 9999;
        mix-blend-mode: normal;
        box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        opacity: 0.95;
      }
    `;
    document.head.appendChild(styleEl);

    const onMove = (e: MouseEvent) => {
      const el = document.querySelector('.custom-cursor') as HTMLDivElement | null;
      if (!el) return;
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
    };

    const onDown = () => {
      const el = document.querySelector('.custom-cursor') as HTMLDivElement | null;
      if (!el) return;
      el.style.width = '28px';
      el.style.height = '28px';
      el.style.opacity = '0.9';
    };

    const onUp = () => {
      const el = document.querySelector('.custom-cursor') as HTMLDivElement | null;
      if (!el) return;
      el.style.width = '14px';
      el.style.height = '14px';
      el.style.opacity = '0.95';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // apply theme colors
    const applyColors = () => {
      const el = document.querySelector('.custom-cursor') as HTMLDivElement | null;
      if (!el) return;
      el.style.background = currentTheme.type === 'purple' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)';
      el.style.border = `2px solid ${currentTheme.accentColor}`;
    };

    applyColors();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, [currentTheme]);

  return null;
}

export default InteractiveCursor;
