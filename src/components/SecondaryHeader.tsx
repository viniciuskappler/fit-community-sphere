
import React, { useState } from 'react';
import { Instagram, Linkedin, Youtube, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: 'pt', name: 'Português', flag: 'br' },
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'es', name: 'Español', flag: 'es' },
];

type SecondaryHeaderProps = {
  isVisible: boolean;
};

const SecondaryHeader = ({ isVisible }: SecondaryHeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white border-b border-gray-200`}>
      <div className="w-4/5 max-w-none mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-10">
          {/* Social Media Icons - Only Instagram, LinkedIn, and YouTube */}
          <div className="flex items-center space-x-3">
            <a href="https://instagram.com/nucleodoesporte" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={16} className="text-gray-600 hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://linkedin.com/company/nucleodoesporte" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} className="text-gray-600 hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://youtube.com/@nucleodoesporte" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={16} className="text-gray-600 hover:text-orange-500 transition-colors" />
            </a>
          </div>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-orange-500 transition-colors">
                <img src={`https://flagcdn.com/w20/${selectedLanguage.flag}.png`} alt={selectedLanguage.name} className="w-4 h-auto" />
                <span>{selectedLanguage.name}</span>
                <ChevronDown size={12} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onSelect={() => setSelectedLanguage(lang)} className="hover:bg-gray-50">
                  <img src={`https://flagcdn.com/w20/${lang.flag}.png`} alt={lang.name} className="w-4 h-auto mr-2" />
                  <span className="text-xs">{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeader;
