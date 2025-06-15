
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="w-4/5 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold">Núcleo do Esporte</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Conectando atletas a estabelecimentos e grupos esportivos. 
              Encontre seu esporte ideal e faça parte de uma comunidade ativa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Buscar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Eventos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Grupos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Academias</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Suporte</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Parceiros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Núcleo do Esporte. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
