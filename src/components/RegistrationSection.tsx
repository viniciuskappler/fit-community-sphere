
import React, { useState } from "react";
import { User, Store, Users } from "lucide-react";
import { Button } from "./ui/button";
import RegistrationModal from "./RegistrationModal";

const options = [{
  icon: <User size={36} color="#ff6600" strokeWidth={2.4} />,
  title: "Esportista Apoiador",
  desc: "Para pessoas que praticam ou têm interesse em esportes.",
  type: "supporter" as const
}, {
  icon: <Store size={36} color="#ff6600" strokeWidth={2.4} />,
  title: "Estabelecimento Parceiro",
  desc: "Para academias, clubes e outros locais esportivos.",
  type: "establishment" as const
}, {
  icon: <Users size={36} color="#ff6600" strokeWidth={2.4} />,
  title: "Grupo de Esporte Parceiro",
  desc: "Para grupos, equipes e coletivos esportivos.",
  type: "group" as const
}];

const RegistrationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'supporter' | 'establishment' | 'group'>('supporter');

  const handleSelectOption = (type: 'supporter' | 'establishment' | 'group') => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="registration-section" className="w-full px-4 flex flex-col items-center py-[100px] bg-gray-50">
        <div className="w-3/4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            Escolha seu perfil
          </h2>
          <p className="text-gray-500 text-center mt-2 mb-8 text-base max-w-xl mx-auto">
            Selecione o tipo de cadastro que melhor se encaixa com você.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {options.map(opt => (
              <div key={opt.title} className="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm border border-[#ebebef] max-w-xs w-full transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer">
                <div className="mb-3">{opt.icon}</div>
                <div className="text-lg font-semibold text-gray-900 text-center mb-2 group-hover:text-orange-500 transition-colors">{opt.title}</div>
                <div className="text-gray-500 text-center text-sm mb-4">{opt.desc}</div>
                <button 
                  onClick={() => handleSelectOption(opt.type)}
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:bg-gradient-to-r hover:from-red-700 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow-none transition hover:shadow-lg"
                >
                  Selecionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={selectedType}
      />
    </>
  );
};

export default RegistrationSection;
