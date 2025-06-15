
import React, { useEffect, useState } from 'react';

const ConfettiAnimation = () => {
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    color: string;
    size: number;
  }>>([]);

  useEffect(() => {
    const colors = ['#ff6600', '#ff8533', '#ffaa66', '#cc5200', '#ff9944'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-bounce"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animationDelay: `${piece.delay}s`,
            animationDuration: '3s',
            top: '-10px',
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;
