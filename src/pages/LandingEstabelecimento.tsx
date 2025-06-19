import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, TrendingUp, CheckCircle, ArrowRight, Play, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RegistrationModal from '@/components/RegistrationModal';

const LandingEstabelecimento = () => {
  const { referralCode } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Track landing page visit
    if (referralCode) {
      console.log('Tracking visit for referral code:', referralCode);
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
      console.log('Tracking registration click for referral code:', referralCode);
      // Aqui seria implementado o tracking do clique
    }
    setIsModalOpen(true);
  };

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Mais Clientes",
      description: "Conecte-se com centenas de atletas em busca de novos locais para treinar"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Maior Visibilidade",
      description: "Apareça nos resultados de busca e no mapa interativo da região"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "Avaliações Reais",
      description: "Receba feedbacks genuínos e construa sua reputação online"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Ferramentas de Gestão",
      description: "Gerencie agendamentos, eventos e relacionamento com clientes"
    }
  ];

  const features = [
    "Perfil completo com fotos e informações",
    "Sistema de agendamento integrado",
    "Gestão de eventos e aulas",
    "Dashboard com métricas e insights",
    "Comunicação direta com clientes",
    "Marketing digital automatizado"
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      business: "CrossFit Cidade",
      text: "Desde que me cadastrei no Núcleo do Esporte, o número de novos alunos aumentou 40%. A plataforma realmente funciona!",
      rating: 5
    },
    {
      name: "Ana Martins", 
      business: "Studio Pilates Zen",
      text: "Facilita muito a gestão do meu estúdio. Os clientes conseguem agendar direto pela plataforma.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={(el) => sectionsRef.current[0] = el}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white opacity-0 transform translate-y-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transforme seu <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Estabelecimento</span>
            <br />em Referência no Esporte
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Conecte-se com milhares de atletas e faça seu negócio crescer no Núcleo do Esporte
          </p>
          <Button
            onClick={handleCadastrarClick}
            className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Cadastrar Meu Estabelecimento
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[1] = el}
        className="py-20 bg-gray-50 opacity-0 transform translate-y-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Por que escolher o <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Núcleo do Esporte?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de 1000 estabelecimentos já confiam em nossa plataforma para expandir seus negócios
            </p>
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
        ref={(el) => sectionsRef.current[2] = el}
        className="py-20 bg-white opacity-0 transform translate-y-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Tudo que você precisa em <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">uma plataforma</span>
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
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Plataforma"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[3] = el}
        className="py-20 bg-gradient-to-br from-orange-50 to-white opacity-0 transform translate-y-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              O que nossos <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">parceiros dizem</span>
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
                  <div className="text-orange-600">{testimonial.business}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleCadastrarClick}
              className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Juntar-se aos Parceiros de Sucesso
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[4] = el}
        className="py-20 bg-gradient-to-r from-orange-600 to-orange-400 text-white opacity-0 transform translate-y-10"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Cadastre-se agora e comece a atrair novos clientes hoje mesmo
          </p>
          <Button
            onClick={handleCadastrarClick}
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Cadastrar Estabelecimento Grátis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType="establishment"
        referralCode={referralCode}
      />
    </div>
  );
};

export default LandingEstabelecimento;
