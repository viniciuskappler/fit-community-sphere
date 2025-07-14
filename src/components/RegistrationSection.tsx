
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Users, Building, Users2 } from 'lucide-react';
import SimpleRegistrationModal from './SimpleRegistrationModal';

const RegistrationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Junte-se ao <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Núcleo do Esporte</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conecte-se com outros atletas, descubra novos locais para treinar e faça parte da maior comunidade esportiva do Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Praticantes</h3>
            <p className="text-gray-600 mb-6">
              Encontre parceiros de treino, descubra eventos esportivos e conecte-se com outros atletas
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white"
            >
              Cadastrar como Praticante
            </Button>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Estabelecimentos</h3>
            <p className="text-gray-600 mb-6">
              Academias, quadras, centros esportivos - divulgue seu espaço e atraia novos clientes
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white"
            >
              Cadastrar Estabelecimento
            </Button>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users2 className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Grupos Esportivos</h3>
            <p className="text-gray-600 mb-6">
              Organize grupos de corrida, futebol, ciclismo e outros esportes em sua região
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white"
            >
              Cadastrar Grupo
            </Button>
          </div>
        </div>
      </div>

      <SimpleRegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default RegistrationSection;
