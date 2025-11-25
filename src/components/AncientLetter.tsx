import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

interface AncientLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AncientLetter({ isOpen, onClose }: AncientLetterProps) {
  const { currentTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative max-w-3xl w-full mx-4 md:mx-0 p-6 md:p-8 rounded-lg shadow-2xl ancient-letter-dialog"
        style={{
          background: 'linear-gradient(180deg, #f6e7c8 0%, #efe0b3 50%, #f6e7c8 100%)',
          border: '6px solid rgba(90,60,30,0.18)',
          color: '#3b2b12',
          fontFamily: `Georgia, 'Times New Roman', serif`,
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className="rounded-full px-3 py-1"
            style={{ background: currentTheme.gradient, color: currentTheme.type === 'pink' ? '#493267' : '#fff' }}
          >
            Close
          </Button>
        </div>

        <div className="mt-4 px-4">
          <div style={{ fontSize: 18, lineHeight: 1.6 }}>
            <div style={{ fontSize: 34, lineHeight: 1, float: 'left', marginRight: 12, fontWeight: 700 }}>D</div>
            ear Samal,

            <p className="mt-4">
  This year somehow decided to surprise me, and it did that by handing me you. I still don’t understand how an online 
  Engene friend managed to feel more real, more steady, and more familiar than half the people I’ve known for years. 
  You showed up quietly, but the impact hasn’t been quiet at all.
</p>

<p className="mt-3">
  You have this calm spark about you. It’s warm without being loud, soft without being dull. Talking to you feels like 
  taking a breath I didn’t know I needed. Maybe it’s the way you listen, or the way your honesty feels unfiltered, or 
  how you somehow make me laugh even when I act like I’m “totally fine.” You’re that rare kind of person who is gentle 
  without being fragile.
</p>

<p className="mt-3">
  I love watching you love things. Enhypen, life, small moments. It’s the kind of energy that pulls people in and 
  leaves them a little better than before. I’m genuinely grateful that our paths crossed in the chaos of this year. 
  If life ever starts feeling too heavy, I hope you remember how easily you make others feel lighter. I hope we get to 
  continue sharing these small but meaningful moments for a long time to come and one day, meet Enhypen like
  we always decided!!!
</p>

<p className="mt-4" style={{ fontStyle: 'italic' }}>
  Happiest Birthday to you
-  Grateful for you, more than I say,
  <br />
              — Someone who adores you
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div style={{ width: 80, height: 80, borderRadius: 9999, background: '#8b1d1d', boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 Z" fill="#FFD9D9" opacity="0.08" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
