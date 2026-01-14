import { Theme } from '../../contexts/ThemeContext';

export function themedHoverEnter(el: HTMLElement, theme: Theme) {
  el.style.background = theme.gradient;
  el.style.color = theme.type === 'pink' ? '#493267' : '#ffffff';
}

export function themedHoverLeave(el: HTMLElement, theme: Theme, defaultBg: string) {
  el.style.background = defaultBg;
  el.style.color = theme.textColor;
}

export function applyThemedHover(e: React.MouseEvent<HTMLElement>, theme: Theme, defaultBg: string) {
  const el = e.currentTarget as HTMLElement;
  themedHoverEnter(el, theme);
  (el as any).__themedDefault = defaultBg;
}

export function removeThemedHover(e: React.MouseEvent<HTMLElement>, theme: Theme) {
  const el = e.currentTarget as HTMLElement;
  const def = (el as any).__themedDefault || '';
  themedHoverLeave(el, theme, def);
}

export default applyThemedHover;
