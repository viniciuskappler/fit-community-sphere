
import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

interface LocationSelectorProps {
  stateValue: string;
  cityValue: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  stateError?: string;
  cityError?: string;
}

// Estados brasileiros
const states = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

// Lista expandida de cidades por estado (incluindo principais cidades, não apenas capitais)
const citiesByState: Record<string, string[]> = {
  'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Brasiléia', 'Xapuri', 'Plácido de Castro'],
  'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo', 'União dos Palmares', 'São Miguel dos Campos', 'Coruripe'],
  'AP': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Porto Grande', 'Mazagão', 'Pedra Branca do Amapari', 'Vitória do Jari'],
  'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Maués', 'Coari', 'Tefé', 'Tabatinga', 'Humaitá', 'São Gabriel da Cachoeira', 'Presidente Figueiredo'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro', 'Itabuna', 'Lauro de Freitas', 'Ilhéus', 'Jequié', 'Teixeira de Freitas', 'Alagoinhas', 'Barreiras', 'Simões Filho', 'Paulo Afonso', 'Eunápolis', 'Santo Antônio de Jesus', 'Valença', 'Candeias', 'Guanambi', 'Jacobina'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá', 'Pacatuba', 'Aquiraz', 'Quixeramobim', 'Canindé', 'Russas', 'Crateús', 'Tianguá', 'Aracati', 'Cascavel', 'Pacajus'],
  'DF': ['Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia', 'Santa Maria', 'Sobradinho', 'Planaltina', 'Águas Claras', 'Guará', 'Núcleo Bandeirante'],
  'ES': ['Vitória', 'Vila Velha', 'Cariacica', 'Serra', 'Guarapari', 'Linhares', 'São Mateus', 'Colatina', 'Cachoeiro de Itapemirim', 'Aracruz', 'Viana', 'Nova Venécia', 'Barra de São Francisco', 'Santa Teresa', 'Domingos Martins'],
  'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama', 'Itumbiara', 'Senador Canedo', 'Catalão', 'Jataí', 'Planaltina', 'Caldas Novas', 'Santo Antônio do Descoberto', 'Goiás', 'Cidade Ocidental', 'Mineiros'],
  'MA': ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia', 'Bacabal', 'Balsas', 'Santa Inês', 'Pinheiro', 'Pedreiras', 'Barra do Corda', 'Chapadinha', 'Santa Luzia', 'Presidente Dutra', 'Viana', 'Rosário', 'Raposa'],
  'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Barra do Garças', 'Primavera do Leste', 'Alta Floresta', 'Ponta Porã', 'Juína', 'Diamantino', 'Mirassol d\'Oeste', 'Guarantã do Norte', 'Nova Mutum', 'Colíder', 'Campos de Júlio', 'Água Boa'],
  'MS': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí', 'Nova Andradina', 'Sidrolândia', 'Maracaju', 'São Gabriel do Oeste', 'Coxim', 'Aquidauana', 'Paranaíba', 'Amambai', 'Bonito', 'Jardim', 'Caarapó', 'Anastácio', 'Ribas do Rio Pardo', 'Chapadão do Sul'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité', 'Poços de Caldas', 'Patos de Minas', 'Teófilo Otoni', 'Sabará', 'Barbacena', 'Varginha', 'Conselheiro Lafaiete', 'Araguari', 'Itabira', 'Passos', 'Coronel Fabriciano', 'Muriaé', 'Ituiutaba', 'Lavras', 'Nova Lima', 'Ubá'],
  'PA': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas', 'Castanhal', 'Abaetetuba', 'Cametá', 'Marituba', 'Bragança', 'Altamira', 'Itaituba', 'Tucuruí', 'Benevides', 'Paragominas', 'Redenção', 'Capanema', 'Tomé-Açu', 'Oriximiná', 'Conceição do Araguaia'],
  'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cajazeiras', 'Cabedelo', 'Guarabira', 'Mamanguape', 'Sapé', 'Desterro', 'Rio Tinto', 'Conde', 'Monteiro', 'Picuí', 'Itabaiana', 'Esperança', 'Mari', 'Princesa Isabel'],
  'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão', 'Igarassu', 'São Lourenço da Mata', 'Santa Cruz do Capibaribe', 'Abreu e Lima', 'Ipojuca', 'Serra Talhada', 'Araripina', 'Gravatá', 'Carpina', 'Goiana'],
  'PI': ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Campo Maior', 'Barras', 'Altos', 'Pedro II', 'Valença do Piauí', 'Esperantina', 'São Raimundo Nonato', 'Luís Correia', 'Bom Jesus', 'Corrente', 'Amarante', 'Agua Branca', 'Oeiras', 'Uruçuí', 'José de Freitas'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Araucária', 'Toledo', 'Apucarana', 'Pinhais', 'Campo Largo', 'Arapongas', 'Almirante Tamandaré', 'Umuarama', 'Piraquara', 'Cambé'],
  'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'Campos dos Goytacazes', 'São João de Meriti', 'Petrópolis', 'Volta Redonda', 'Magé', 'Macaé', 'Itaboraí', 'Cabo Frio', 'Angra dos Reis', 'Nova Friburgo', 'Barra Mansa', 'Teresópolis', 'Mesquita', 'Nilópolis'],
  'RN': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim', 'Caicó', 'Assu', 'Nova Cruz', 'João Câmara', 'Currais Novos', 'Santa Cruz', 'Touros', 'Açu', 'Canguaretama', 'São José de Mipibu', 'Apodi', 'Pedro Velho', 'Extremoz', 'São Paulo do Potengi'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Alvorada', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul', 'Cachoeirinha', 'Bagé', 'Bento Gonçalves', 'Erechim', 'Guaíba'],
  'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Rolim de Moura', 'Jaru', 'Guajará-Mirim', 'Buritis', 'Ouro Preto do Oeste', 'Presidente Médici', 'Espigão d\'Oeste', 'Colorado do Oeste', 'Cerejeiras', 'Alta Floresta d\'Oeste', 'Pimenta Bueno', 'Costa Marques', 'São Miguel do Guaporé', 'Nova Brasilândia d\'Oeste', 'Machadinho d\'Oeste'],
  'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Mucajaí', 'Cantá', 'Bonfim', 'Normandia', 'São João da Baliza', 'São Luiz', 'Caroebe', 'Iracema', 'Amajari', 'Pacaraima', 'Uiramutã'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó', 'Itajaí', 'Lages', 'Jaraguá do Sul', 'Palhoça', 'Balneário Camboriú', 'Brusque', 'Tubarão', 'São Bento do Sul', 'Caçador', 'Camboriú', 'Navegantes', 'Concórdia', 'Rio do Sul', 'Araranguá'],
  'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Mauá', 'São José dos Campos', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Carapicuíba', 'Piracicaba', 'Bauru', 'São Vicente', 'Franca', 'Guarujá', 'Taubaté', 'Praia Grande', 'Limeira', 'Suzano', 'Taboão da Serra', 'Sumaré', 'Barueri', 'Embu das Artes', 'São Carlos', 'Marília', 'Indaiatuba'],
  'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância', 'Tobias Barreto', 'Simão Dias', 'Propriá', 'Canindé de São Francisco', 'Barra dos Coqueiros', 'Ribeirópolis', 'Neópolis', 'Glória', 'Carmópolis', 'Aquidabã', 'Rosário do Catete', 'Maruim', 'Poço Redondo', 'Campo do Brito'],
  'TO': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins', 'Colinas do Tocantins', 'Guaraí', 'Formoso do Araguaia', 'Miranorte', 'Dianópolis', 'Taguatinga', 'Peixe', 'Araguatins', 'Tocantinópolis', 'Pedro Afonso', 'Xambioá', 'Alvorada', 'Miracema do Tocantins', 'Wanderlândia', 'Babaçulândia']
};

const LocationSelector = ({ 
  stateValue, 
  cityValue, 
  onStateChange, 
  onCityChange, 
  stateError, 
  cityError 
}: LocationSelectorProps) => {
  const [citySearch, setCitySearch] = useState('');
  
  const availableCities = useMemo(() => {
    if (!stateValue) return [];
    return citiesByState[stateValue] || [];
  }, [stateValue]);

  const filteredCities = useMemo(() => {
    if (!citySearch) return availableCities;
    return availableCities.filter(city => 
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [availableCities, citySearch]);

  const handleStateChange = (value: string) => {
    onStateChange(value);
    onCityChange(''); // Reset city when state changes
    setCitySearch('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Select value={stateValue} onValueChange={handleStateChange}>
          <SelectTrigger className={stateError ? 'border-orange-500' : ''}>
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {stateError && (
          <p className="text-orange-500 text-sm mt-1">{stateError}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            placeholder="Digite o nome da cidade"
            value={cityValue || citySearch}
            onChange={(e) => {
              setCitySearch(e.target.value);
              onCityChange(e.target.value);
            }}
            className={cityError ? 'border-orange-500' : ''}
            disabled={!stateValue}
          />
          {stateValue && filteredCities.length > 0 && citySearch && (
            <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                  onClick={() => {
                    onCityChange(city);
                    setCitySearch('');
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        {cityError && (
          <p className="text-orange-500 text-sm mt-1">{cityError}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
