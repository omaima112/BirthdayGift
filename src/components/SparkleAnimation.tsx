import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export function SparkleAnimation() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 15; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 2,
          size: 12 + Math.random() * 12,
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
          }}
        >
          <Sparkles
            size={sparkle.size}
            className="text-yellow-300 opacity-70"
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
}
