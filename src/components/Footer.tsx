
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white py-16 bg-zinc-50">
      <div className="w-4/5 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-orange-600 to-orange-400 p-2 rounded-xl">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-zinc-950 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Núcleo do Esporte</span>
            </div>
            <p className="mb-6 max-w-md text-zinc-800">
              Conectando atletas a estabelecimentos e grupos esportivos. 
              Encontre seu esporte ideal e faça parte de uma comunidade ativa.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/nucleodoesporte" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                Instagram
              </a>
              <a href="https://linkedin.com/company/nucleodoesporte" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                LinkedIn
              </a>
              <a href="https://youtube.com/@nucleodoesporte" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                YouTube
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-zinc-800 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Plataforma</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hub" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Hub Principal
                </Link>
              </li>
              <li>
                <Link to="/modalidades-esportivas" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Modalidades Esportivas
                </Link>
              </li>
              <li>
                <Link to="/busca" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Buscar
                </Link>
              </li>
            </ul>
          </div>

          {/* Usuários */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-zinc-800 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Usuários</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/praticante" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Praticantes
                </Link>
              </li>
              <li>
                <Link to="/estabelecimento" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Estabelecimentos
                </Link>
              </li>
              <li>
                <Link to="/grupo-esportivo" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Grupos Esportivos
                </Link>
              </li>
              <li>
                <Link to="/termos-uso" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidade" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent font-medium">
            © 2025 Núcleo do Esporte. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
