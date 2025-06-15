
import React, { useEffect, useState } from 'react';

const ConfettiAnimation = () => {
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    color: string;
    size: number;
    rotation: number;
    fall: number;
  }>>([]);

  useEffect(() => {
    const colors = ['#ff6600', '#ff8533', '#ffaa66', '#cc5200', '#ff9944', '#e55100', '#ffa726'];
    const newConfetti = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      fall: Math.random() * 8 + 4
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-pulse"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.fall}s`,
            animationIterationCount: 'infinite',
            top: '-20px',
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall ${piece.fall}s linear ${piece.delay}s infinite`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfettiAnimation;
