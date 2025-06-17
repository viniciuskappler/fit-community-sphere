
import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4">
      <div className="bg-gray-900 text-white rounded-lg p-6 max-w-2xl w-full shadow-2xl">
        <p className="text-sm leading-relaxed mb-6">
          Usamos cookies essenciais para fazer nosso site funcionar. 
          Também definimos cookies adicionais que nos ajudam a melhorar 
          sua experiência, mantê-lo seguro, realizar análises e veicular 
          anúncios relevantes. Esses cookies adicionais serão definidos 
          apenas se você clicar em 'Aceitar' abaixo. Para mais informações 
          sobre os cookies que usamos, ou para alterar suas preferências, 
          visite nossa Política de Cookies.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Aceitar
          </button>
          <button
            onClick={handleReject}
            className="flex-1 bg-transparent border border-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
