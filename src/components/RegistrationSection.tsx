
import React from "react";
import { User, Store, Users } from "lucide-react";
import { Button } from "./ui/button";

const options = [
  {
    icon: <User size={44} color="#ff6600" strokeWidth={2.4} />,
    title: "Esportista Apoiador",
    desc: "Para pessoas que praticam ou têm interesse em esportes.",
  },
  {
    icon: <Store size={44} color="#ff6600" strokeWidth={2.4} />,
    title: "Estabelecimento Parceiro",
    desc: "Para academias, clubes e outros locais esportivos.",
  },
  {
    icon: <Users size={44} color="#ff6600" strokeWidth={2.4} />,
    title: "Grupo de Esporte Parceiro",
    desc: "Para grupos, equipes e coletivos esportivos.",
  },
];

const RegistrationSection = () => {
  return (
    <section className="w-full bg-[#f7f7fa] py-14 px-4 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Escolha seu perfil
        </h2>
        <p className="text-gray-500 text-center mt-2 mb-10 text-lg max-w-2xl mx-auto">
          Selecione o tipo de cadastro que melhor se encaixa com você.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="flex flex-col items-center bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#ebebef] max-w-xs w-full transition-shadow hover:shadow-md"
            >
              <div className="mb-4">{opt.icon}</div>
              <div className="text-xl font-semibold text-gray-900 text-center mb-2">{opt.title}</div>
              <div className="text-gray-500 text-center text-base mb-6">{opt.desc}</div>
              <Button
                className="bg-orange-500 hover:bg-orange-700 text-white font-semibold px-8 py-2 rounded-xl text-lg shadow-none transition"
                tabIndex={-1}
                type="button"
              >
                Selecionar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
