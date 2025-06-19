
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Heart, Calendar, Trophy, CheckCircle, ArrowRight, Star, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RegistrationModal from '@/components/RegistrationModal';

const LandingGrupo = () => {
  const { referralCode } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Track landing page visit
    if (referralCode) {
      console.log('Tracking visit for group referral code:', referralCode);
      // Aqui seria implementado o tracking real
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in', 'animate-scale-in');
            const index = sectionsRef.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [referralCode]);

  const handleCadastrarClick = () => {
    if (referralCode) {
      console.log('Tracking registration click for group referral code:', referralCode);
      // Aqui seria implementado o tracking do clique
    }
    setIsModalOpen(true);
  };

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Novos Membros",
      description: "Conecte-se com atletas interessados em participar do seu grupo"
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-500" />,
      title: "Organização de Eventos",
      description: "Gerencie treinos, competições e encontros de forma profissional"
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: "Comunidade Engajada",
      description: "Crie uma base sólida de praticantes comprometidos"
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      title: "Visibilidade Esportiva",
      description: "Destaque seu grupo no cenário esportivo local e regional"
    }
  ];

  const features = [
    "Perfil completo do grupo com descrição e fotos",
    "Gestão de membros e inscrições",
    "Calendário de treinos e eventos",
    "Comunicação direta com participantes",
    "Sistema de avaliações e feedback",
    "Ferramentas de divulgação integradas"
  ];

  const testimonials = [
    {
      name: "Roberto Mendes",
      group: "Pelotão de Corrida SP",
      text: "Com o Núcleo do Esporte, nosso grupo cresceu de 15 para 80 corredores em 6 meses. A plataforma é incrível!",
      rating: 5
    },
    {
      name: "Mariana Costa", 
      group: "Vôlei Feminino Cidade",
      text: "Facilita muito organizar nossos treinos e campeonatos. Todas as meninas usam a plataforma.",
      rating: 5
    }
  ];

  const groupTypes = [
    {
      icon: "🏃‍♂️",
      name: "Corrida",
      description: "Grupos de corrida de rua, trail e maratona"
    },
    {
      icon: "🚴‍♀️",
      name: "Ciclismo",
      description: "Pedais urbanos, mountain bike e speed"
    },
    {
      icon: "🏐",
      name: "Esportes Coletivos",
      description: "Futebol, vôlei, basquete e outros"
    },
    {
      icon: "🧘‍♀️",
      name: "Bem-estar",
      description: "Yoga, pilates e atividades ao ar livre"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={(el) => sectionsRef.current[0] = el}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white opacity-0 transform translate-y-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Conecte seu <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Grupo Esportivo</span>
            <br />com novos atletas
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Faça parte da maior rede de grupos esportivos do Brasil
          </p>
          <Button
            onClick={handleCadastrarClick}
            className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Cadastrar Meu Grupo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[1] = el}
        className="py-20 bg-white opacity-0 transform translate-y-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Todos os tipos de <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">grupos esportivos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Independente do esporte que vocês praticam, temos espaço para todos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {groupTypes.map((type, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center border border-orange-100">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleCadastrarClick}
              className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-3 text-lg font-semibold rounded-xl"
            >
              Cadastrar Meu Grupo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[2] = el}
        className="py-20 bg-gray-50 opacity-0 transform translate-y-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Benefícios para o seu <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">grupo</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleCadastrarClick}
              className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-3 text-lg font-semibold rounded-xl"
            >
              Quero Esses Benefícios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[3] = el}
        className="py-20 bg-white opacity-0 transform translate-y-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Grupo esportivo"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Ferramentas completas para <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">seu grupo</span>
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleCadastrarClick}
                className="mt-8 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-3 text-lg font-semibold rounded-xl"
              >
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[4] = el}
        className="py-20 bg-gradient-to-br from-orange-50 to-white opacity-0 transform translate-y-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Histórias de <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">sucesso</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-orange-600">{testimonial.group}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleCadastrarClick}
              className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Fazer Parte da Comunidade
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[5] = el}
        className="py-20 bg-gradient-to-r from-orange-600 to-orange-400 text-white opacity-0 transform translate-y-10"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Seu grupo merece destaque!
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Cadastre-se gratuitamente e comece a atrair novos membros hoje
          </p>
          <Button
            onClick={handleCadastrarClick}
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Cadastrar Grupo Grátis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType="group"
        referralCode={referralCode}
      />
    </div>
  );
};

export default LandingGrupo;
