
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
    shape: string;
  }>>([]);

  useEffect(() => {
    const colors = ['#ff6600', '#ff8533', '#ffaa66', '#cc5200', '#ff9944', '#e55100', '#ffa726', '#ffb74d', '#ff5722'];
    const shapes = ['circle', 'square', 'triangle'];
    
    const newConfetti = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 15 + 8,
      rotation: Math.random() * 360,
      fall: Math.random() * 6 + 5,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(1080deg);
              opacity: 0;
            }
          }
          
          @keyframes confetti-sway {
            0%, 100% {
              transform: translateX(-10px);
            }
            50% {
              transform: translateX(10px);
            }
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%) skewX(-12deg);
            }
            100% {
              transform: translateX(200%) skewX(-12deg);
            }
          }
        `}
      </style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.fall}s`,
              animationIterationCount: 'infinite',
              top: '-50px',
              borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'triangle' ? '0' : '3px',
              transform: `rotate(${piece.rotation}deg)`,
              animation: `confetti-fall ${piece.fall}s linear ${piece.delay}s infinite, confetti-sway 3s ease-in-out infinite`,
              boxShadow: '0 0 10px rgba(255, 102, 0, 0.3)',
              clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ConfettiAnimation;
