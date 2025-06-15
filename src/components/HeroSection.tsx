import React, { useState, useEffect } from 'react';
import RegistrationModal from './RegistrationModal';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Todo esporte encontra seu espaço. Toda pessoa encontra seu esporte.",
    "Conectando pessoas, estabelecimentos e grupos em um único ecossistema esportivo.",
    "O movimento que transforma a maneira como vivemos o esporte."
  ];

  const sportsBanners = [
    {
      name: 'Musculação',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop'
    },
    {
      name: 'Tênis',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop'
    },
    {
      name: 'Canoagem',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop'
    },
    {
      name: 'Trekking',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop'
    },
    {
      name: 'Ciclismo',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=800&fit=crop'
    },
    {
      name: 'Corrida',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=800&fit=crop'
    },
    {
      name: 'Ginástica',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=800&fit=crop'
    },
    {
      name: 'Hipismo',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&h=800&fit=crop'
    },
    {
      name: 'Futebol',
      image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200&h=800&fit=crop'
    },
    {
      name: 'Rugby',
      image: 'https://images.unsplash.com/photo-1588124107945-5a7a83a427f7?w=1200&h=800&fit=crop'
    },
    {
      name: 'Crossfit',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop'
    },
    {
      name: 'Levantamento de Peso',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&h=800&fit=crop'
    },
    {
      name: 'Natação',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&h=800&fit=crop'
    }
  ];

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isTyping && !isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 35); // 50% faster typing
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
        }, 20); // 50% faster deleting
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [displayedText, isTyping, isDeleting, currentPhraseIndex, phrases]);

  const getStyledText = (text: string) => {
    const words = text.split(' ');
    const keyWords = ['esporte', 'pessoas', 'estabelecimentos', 'grupos', 'ecossistema', 'movimento', 'transforma'];
    
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,]/g, '');
      const isKeyWord = keyWords.includes(cleanWord.toLowerCase()) && cleanWord.length > 5;
      const isFirstLetter = index === 0;
      
      if (isFirstLetter) {
        return (
          <span key={index}>
            <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">
              {word.charAt(0)}
            </span>
            <span className="text-white">
              {word.slice(1)}
            </span>
            {index < words.length - 1 && ' '}
          </span>
        );
      }
      
      if (isKeyWord) {
        return (
          <span key={index} className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">
            {word}
            {index < words.length - 1 && ' '}
          </span>
        );
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

  return (
    <>
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-white">
        {/* Background Banners */}
        <div className="absolute inset-0" style={{ top: '-120px' }}>
          <div className="flex animate-scroll-fast space-x-8 h-[calc(100%+120px)]">
            {[...sportsBanners, ...sportsBanners].map((sport, index) => (
              <div key={index} className="flex-shrink-0 w-[900px] h-full relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: `url(${sport.image})`
                  }} 
                />
                {/* Dark overlay for better contrast */}
                <div className="absolute inset-0 bg-black/60" />
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-white" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>
        
        <div className="relative w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 z-10 flex items-center justify-center h-full">
          <div className="text-center">
            {/* Animated Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight min-h-[200px] flex items-center justify-center">
              <span className="block">
                {getStyledText(displayedText)}
                <span className="animate-pulse bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">|</span>
              </span>
            </h1>

            {/* Subtitle */}
            <div className="text-white mb-8 max-w-xl mx-auto leading-relaxed text-xl md:text-2xl font-medium text-center">
              <p className="mb-2">Faça parte do movimento que está</p>
              <p>transformando vidas através da união do Esporte.</p>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleCadastrarClick}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Cadastrar agora →
            </button>
          </div>
        </div>
      </section>

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType="supporter"
      />
    </>
  );
};

export default HeroSection;
