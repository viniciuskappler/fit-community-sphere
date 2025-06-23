
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Todo esporte encontra seu espaço. Toda pessoa encontra seu esporte.",
    "Conectando pessoas, estabelecimentos e grupos em um único ecossistema esportivo.",
    "O movimento que transforma a maneira como vivemos o esporte."
  ];

  const heroSlides = [
    {
      type: 'image',
      url: '/lovable-uploads/e5644ad9-b874-4157-873e-40502cf056b0.png',
      title: 'Treinamento Funcional',
      subtitle: 'Supere seus limites todos os dias'
    },
    {
      type: 'image', 
      url: '/lovable-uploads/72437099-6d2b-44fc-a4be-2de3feb06dbc.png',
      title: 'CrossFit Intenso',
      subtitle: 'Força e resistência em cada movimento'
    },
    {
      type: 'image',
      url: '/lovable-uploads/f837a4ce-7c6e-461f-ba63-edcf4bf741fc.png',
      title: 'Tiro com Arco',
      subtitle: 'Precisão e foco em cada disparo'
    },
    {
      type: 'image',
      url: '/lovable-uploads/e86c5380-4c2d-4b0b-99e8-8b93aeca8636.png',
      title: 'Escalada Esportiva',
      subtitle: 'Desafie suas alturas e conquiste novos patamares'
    },
    {
      type: 'image',
      url: '/lovable-uploads/67b4cf92-c94a-4f4b-a770-ff1f58239a6d.png',
      title: 'Trekking & Aventura',
      subtitle: 'Explore novos horizontes e conecte-se com a natureza'
    },
    {
      type: 'image',
      url: '/lovable-uploads/44959214-1bcf-4335-9376-cdaa51c8183c.png',
      title: 'Montanhismo',
      subtitle: 'Conquiste picos e supere seus próprios limites'
    },
    {
      type: 'image',
      url: '/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png',
      title: 'Corrida & Running',
      subtitle: 'Cada passo é uma conquista pessoal'
    },
    {
      type: 'image',
      url: '/lovable-uploads/ce01b34d-566a-420b-9fb3-29ed4b24590b.png',
      title: 'Atletismo',
      subtitle: 'Velocidade, força e determinação'
    }
  ];

  // Auto-slide functionality - 3 seconds per image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isTyping && !isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
    if (isDeleting) {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
      }
    }
  }, [displayedText, isTyping, isDeleting, currentPhraseIndex, phrases]);

  const getStyledText = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,]/g, '');
      
      // Highlight specific words: "Todo esporte", "Toda pessoa", "espaço", "esporte"
      if (cleanWord.toLowerCase() === 'todo' && words[index + 1]?.toLowerCase().replace(/[.,]/g, '') === 'esporte') {
        return (
          <span key={index}>
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              {word} {words[index + 1]}
            </span>
            {index < words.length - 2 && ' '}
          </span>
        );
      }
      
      if (cleanWord.toLowerCase() === 'toda' && words[index + 1]?.toLowerCase().replace(/[.,]/g, '') === 'pessoa') {
        return (
          <span key={index}>
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              {word} {words[index + 1]}
            </span>
            {index < words.length - 2 && ' '}
          </span>
        );
      }
      
      if (cleanWord.toLowerCase() === 'espaço' || cleanWord.toLowerCase() === 'esporte') {
        return (
          <span key={index} className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            {word}
            {index < words.length - 1 && ' '}
          </span>
        );
      }
      
      // Skip words that were already processed as part of combinations
      if (index > 0 && words[index - 1]?.toLowerCase() === 'todo' && cleanWord.toLowerCase() === 'esporte') {
        return null;
      }
      if (index > 0 && words[index - 1]?.toLowerCase() === 'toda' && cleanWord.toLowerCase() === 'pessoa') {
        return null;
      }
      
      return (
        <span key={index} className="text-white">
          {word}
          {index < words.length - 1 && ' '}
        </span>
      );
    });
  };

  const handleCadastrarClick = () => {
    setIsModalOpen(true);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <>
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-black">
        {/* Dynamic Background Slides */}
        <div className="absolute inset-0" style={{ top: '-120px' }}>
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 h-[calc(100%+120px)] transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transform scale-105"
                style={{ backgroundImage: `url(${slide.url})` }}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
          
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white z-10" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-500 scale-110' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
        
        <div className="relative w-full px-6 md:w-11/12 lg:w-3/4 mx-auto md:px-8 lg:px-8 py-16 md:py-32 z-20 flex items-center justify-center h-full">
          <div className="text-center">
            {/* Dynamic Slide Title */}
            <div className="mb-4 opacity-90">
              <h3 className="text-lg md:text-xl text-orange-400 font-semibold mb-1">
                {currentSlideData.title}
              </h3>
              <p className="text-sm md:text-base text-white/80">
                {currentSlideData.subtitle}
              </p>
            </div>

            {/* Animated Main Heading */}
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight min-h-[200px] flex items-center justify-center">
              <span className="block">
                {getStyledText(displayedText)}
                <span className="animate-pulse bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">|</span>
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <div className="text-white mb-8 max-w-2xl mx-auto leading-relaxed text-base md:text-2xl font-medium text-center">
              <p className="mb-4">
                🚀 Faça parte do movimento que está
                <br className="md:hidden" />
                {' '}transformando vidas através da união
                <br className="md:hidden" />
                {' '}do Esporte.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm md:text-base opacity-90">
                <span className="bg-orange-500/20 px-3 py-1 rounded-full">🏆 +{Math.floor(Math.random() * 50) + 200} atletas conectados</span>
                <span className="bg-blue-500/20 px-3 py-1 rounded-full">⚡ Acesso instantâneo</span>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center items-center">
              <button 
                onClick={handleCadastrarClick} 
                className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 group"
              >
                <span>🔥 Cadastrar agora</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialType="supporter" />
    </>
  );
};

export default HeroSection;
