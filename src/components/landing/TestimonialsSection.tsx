
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialsSectionProps {
  onCadastrarClick: () => void;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

const TestimonialsSection = ({ onCadastrarClick, sectionsRef }: TestimonialsSectionProps) => {
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
            onClick={onCadastrarClick}
            className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Juntar-se aos Parceiros de Sucesso
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
