
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const CountdownTimer = ({ targetDate, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      try {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        
        // Verificar se as datas são válidas
        if (isNaN(now) || isNaN(target)) {
          console.error('⚠️ Datas inválidas no CountdownTimer');
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };
        }
        
        const difference = target - now;
        
        if (difference <= 0) {
          setIsComplete(true);
          if (onComplete) onComplete();
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };
        }
        
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } catch (error) {
        console.error('❌ Erro no CountdownTimer:', error);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, mounted]);

  // Não renderizar até estar montado (evita hydration mismatch)
  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-primary/90 to-primary rounded-lg p-4 shadow-lg">
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-primary-foreground/20 rounded mx-auto w-3/4"></div>
          <div className="h-16 bg-primary-foreground/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="bg-destructive text-destructive-foreground rounded-lg p-4 text-center font-semibold shadow-lg">
        Oferta de Beta Tester encerrada!
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary rounded-lg p-4 shadow-lg">
      <h3 className="text-primary-foreground text-lg font-bold mb-2">
        PROMOÇÃO BETA-TESTER: 50% OFF TERMINA EM:
      </h3>
      <div className="flex justify-center gap-2 text-primary-foreground">
        <div className="flex flex-col items-center">
          <div className="bg-primary-foreground/20 rounded-lg p-2 min-w-16 text-center">
            <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
          </div>
          <span className="text-xs mt-1">Dias</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-foreground/20 rounded-lg p-2 min-w-16 text-center">
            <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
          </div>
          <span className="text-xs mt-1">Horas</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-foreground/20 rounded-lg p-2 min-w-16 text-center">
            <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          </div>
          <span className="text-xs mt-1">Minutos</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-foreground/20 rounded-lg p-2 min-w-16 text-center animate-pulse">
            <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <span className="text-xs mt-1">Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
