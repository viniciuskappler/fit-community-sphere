
import React, { useState, useEffect } from "react";
import { User, Store, Users, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import RegistrationModal from "./RegistrationModal";
import StatisticsPanel from "./StatisticsPanel";
import { useLocation } from "react-router-dom";

const options = [{
  icon: <User size={36} color="#ff6600" strokeWidth={2.4} />,
  title: "Praticante",
  desc: "Para pessoas que praticam ou têm interesse em esportes.",
  type: "supporter" as const
}, {
  icon: <Store size={36} color="#ff6600" strokeWidth={2.4} />,
  title: "Estabelecimento",
  desc: "Para academias, clubes e outros locais esportivos.",
  type: "establishment" as const
}, {
  icon: <Users size={36} color="#ff6600" strokeWidth={2.4} />,
  title: "Grupo Esportivo",
  desc: "Para grupos, equipes e coletivos esportivos.",
  type: "group" as const
}];

const RegistrationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'supporter' | 'establishment' | 'group'>('supporter');
  const [promoCode, setPromoCode] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    // Verificar se há código promocional na URL
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('promo') || urlParams.get('codigo');
    if (code) {
      setPromoCode(code.toUpperCase());
    }
  }, [location]);

  const handleSelectOption = (type: 'supporter' | 'establishment' | 'group') => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <section 
        id="registration-section" 
        className="w-full px-6 md:px-8 lg:px-4 flex flex-col items-center py-[100px] bg-gray-50 reveal-on-scroll"
      >
        <div className="w-full md:w-11/12 lg:w-3/4 mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-center text-gray-900">
            Escolha seu perfil
          </h1>
          <p className="text-gray-500 text-center mt-2 mb-8 text-base max-w-xl mx-auto">
            Selecione o tipo de cadastro que melhor 
            <br className="md:hidden" />
            {' '}se encaixa com você.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {options.map(opt => (
              <div key={opt.title} className="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm border border-[#ebebef] max-w-xs w-full transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer reveal-on-scroll">
                <div className="mb-3">{opt.icon}</div>
                <div className="text-lg font-semibold text-gray-900 text-center mb-2 group-hover:text-orange-500 transition-colors">{opt.title}</div>
                <div className="text-gray-500 text-center text-sm mb-4">{opt.desc}</div>
                <button 
                  onClick={() => handleSelectOption(opt.type)}
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:bg-gradient-to-r hover:from-red-700 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow-none transition hover:shadow-lg flex items-center space-x-2"
                >
                  <span>Selecionar</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Always show SQUAD 300 Banner */}
      <section className="w-full px-6 md:px-8 lg:px-4 flex flex-col items-center py-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="w-full md:w-11/12 lg:w-3/4 mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-8 rounded-2xl shadow-2xl border border-orange-400/30">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">🎉 Chegou o Núcleo do Esporte!</h2>
              <p className="text-xl mb-4">
                Garanta sua vaga no SQUAD 300, pague metade do preço e trave este valor para sempre.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <span className="text-2xl font-bold">Escaneie o QR Code e entre para a revolução do esporte!</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <div className="text-3xl font-bold">50%</div>
                <div className="text-sm">Desconto Vitalício</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <div className="text-3xl font-bold">300</div>
                <div className="text-sm">Vagas Limitadas</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <div className="text-3xl font-bold">🏆</div>
                <div className="text-sm">Squad Exclusivo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Panel */}
      <StatisticsPanel />

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={selectedType}
        promoCode={promoCode}
      />
    </>
  );
};

export default RegistrationSection;
