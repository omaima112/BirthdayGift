import React, { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

interface ConfettiAnimationProps {
  trigger: boolean;
  colors?: string[];
}

export function ConfettiAnimation({ trigger, colors = ['#ffdc02', '#f8bf33', '#e98ec0', '#d896ff', '#be29ec'] }: ConfettiAnimationProps) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [show, setShow] = useState(false);
  const [lastTrigger, setLastTrigger] = useState(false);

  useEffect(() => {
    if (trigger && !lastTrigger) {
      const newConfetti: Confetti[] = [];
      for (let i = 0; i < 50; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 1,
          size: 8 + Math.random() * 8,
        });
      }
      setConfetti(newConfetti);
      setShow(true);
      setLastTrigger(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    } else if (!trigger && lastTrigger) {
      setLastTrigger(false);
    }
  }, [trigger, lastTrigger]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 rounded-full"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}