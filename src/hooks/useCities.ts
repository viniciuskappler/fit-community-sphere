// Hook simplificado para cidades - usando dados estáticos
import { useState, useEffect } from 'react';

interface City {
  name: string;
  state_code: string;
}

// Dados estáticos das principais cidades brasileiras por estado
const CITIES_BY_STATE: Record<string, City[]> = {
  'AC': [
    { name: 'Rio Branco', state_code: 'AC' },
    { name: 'Cruzeiro do Sul', state_code: 'AC' },
  ],
  'AL': [
    { name: 'Maceió', state_code: 'AL' },
    { name: 'Arapiraca', state_code: 'AL' },
  ],
  'AP': [
    { name: 'Macapá', state_code: 'AP' },
    { name: 'Santana', state_code: 'AP' },
  ],
  'AM': [
    { name: 'Manaus', state_code: 'AM' },
    { name: 'Parintins', state_code: 'AM' },
  ],
  'BA': [
    { name: 'Salvador', state_code: 'BA' },
    { name: 'Feira de Santana', state_code: 'BA' },
    { name: 'Vitória da Conquista', state_code: 'BA' },
    { name: 'Camaçari', state_code: 'BA' },
  ],
  'CE': [
    { name: 'Fortaleza', state_code: 'CE' },
    { name: 'Caucaia', state_code: 'CE' },
    { name: 'Juazeiro do Norte', state_code: 'CE' },
  ],
  'DF': [
    { name: 'Brasília', state_code: 'DF' },
  ],
  'ES': [
    { name: 'Vitória', state_code: 'ES' },
    { name: 'Vila Velha', state_code: 'ES' },
    { name: 'Serra', state_code: 'ES' },
  ],
  'GO': [
    { name: 'Goiânia', state_code: 'GO' },
    { name: 'Aparecida de Goiânia', state_code: 'GO' },
    { name: 'Anápolis', state_code: 'GO' },
  ],
  'MA': [
    { name: 'São Luís', state_code: 'MA' },
    { name: 'Imperatriz', state_code: 'MA' },
  ],
  'MT': [
    { name: 'Cuiabá', state_code: 'MT' },
    { name: 'Várzea Grande', state_code: 'MT' },
  ],
  'MS': [
    { name: 'Campo Grande', state_code: 'MS' },
    { name: 'Dourados', state_code: 'MS' },
  ],
  'MG': [
    { name: 'Belo Horizonte', state_code: 'MG' },
    { name: 'Uberlândia', state_code: 'MG' },
    { name: 'Contagem', state_code: 'MG' },
    { name: 'Juiz de Fora', state_code: 'MG' },
  ],
  'PA': [
    { name: 'Belém', state_code: 'PA' },
    { name: 'Ananindeua', state_code: 'PA' },
  ],
  'PB': [
    { name: 'João Pessoa', state_code: 'PB' },
    { name: 'Campina Grande', state_code: 'PB' },
  ],
  'PR': [
    { name: 'Curitiba', state_code: 'PR' },
    { name: 'Londrina', state_code: 'PR' },
    { name: 'Maringá', state_code: 'PR' },
  ],
  'PE': [
    { name: 'Recife', state_code: 'PE' },
    { name: 'Jaboatão dos Guararapes', state_code: 'PE' },
    { name: 'Olinda', state_code: 'PE' },
  ],
  'PI': [
    { name: 'Teresina', state_code: 'PI' },
    { name: 'Parnaíba', state_code: 'PI' },
  ],
  'RJ': [
    { name: 'Rio de Janeiro', state_code: 'RJ' },
    { name: 'São Gonçalo', state_code: 'RJ' },
    { name: 'Duque de Caxias', state_code: 'RJ' },
    { name: 'Nova Iguaçu', state_code: 'RJ' },
    { name: 'Niterói', state_code: 'RJ' },
  ],
  'RN': [
    { name: 'Natal', state_code: 'RN' },
    { name: 'Mossoró', state_code: 'RN' },
  ],
  'RS': [
    { name: 'Porto Alegre', state_code: 'RS' },
    { name: 'Caxias do Sul', state_code: 'RS' },
    { name: 'Pelotas', state_code: 'RS' },
  ],
  'RO': [
    { name: 'Porto Velho', state_code: 'RO' },
    { name: 'Ji-Paraná', state_code: 'RO' },
  ],
  'RR': [
    { name: 'Boa Vista', state_code: 'RR' },
  ],
  'SC': [
    { name: 'Florianópolis', state_code: 'SC' },
    { name: 'Joinville', state_code: 'SC' },
    { name: 'Blumenau', state_code: 'SC' },
  ],
  'SP': [
    { name: 'São Paulo', state_code: 'SP' },
    { name: 'Guarulhos', state_code: 'SP' },
    { name: 'Campinas', state_code: 'SP' },
    { name: 'São Bernardo do Campo', state_code: 'SP' },
    { name: 'Santo André', state_code: 'SP' },
    { name: 'Osasco', state_code: 'SP' },
    { name: 'Sorocaba', state_code: 'SP' },
    { name: 'Ribeirão Preto', state_code: 'SP' },
  ],
  'SE': [
    { name: 'Aracaju', state_code: 'SE' },
  ],
  'TO': [
    { name: 'Palmas', state_code: 'TO' },
  ],
};

export const useCities = (stateCode?: string) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stateCode) {
      setCities([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    // Simular delay para parecer uma requisição real
    setTimeout(() => {
      const stateCities = CITIES_BY_STATE[stateCode] || [];
      setCities(stateCities);
      setLoading(false);
    }, 300);
  }, [stateCode]);

  return { cities, loading, error };
};