
-- Criar tabela para armazenar estados brasileiros
CREATE TABLE IF NOT EXISTS public.states (
  id SERIAL PRIMARY KEY,
  code VARCHAR(2) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para armazenar municípios brasileiros
CREATE TABLE IF NOT EXISTS public.cities (
  id SERIAL PRIMARY KEY,
  ibge_code VARCHAR(7) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  state_code VARCHAR(2) NOT NULL REFERENCES public.states(code),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir estados brasileiros
INSERT INTO public.states (code, name) VALUES
('AC', 'Acre'),
('AL', 'Alagoas'),
('AP', 'Amapá'),
('AM', 'Amazonas'),
('BA', 'Bahia'),
('CE', 'Ceará'),
('DF', 'Distrito Federal'),
('ES', 'Espírito Santo'),
('GO', 'Goiás'),
('MA', 'Maranhão'),
('MT', 'Mato Grosso'),
('MS', 'Mato Grosso do Sul'),
('MG', 'Minas Gerais'),
('PA', 'Pará'),
('PB', 'Paraíba'),
('PR', 'Paraná'),
('PE', 'Pernambuco'),
('PI', 'Piauí'),
('RJ', 'Rio de Janeiro'),
('RN', 'Rio Grande do Norte'),
('RS', 'Rio Grande do Sul'),
('RO', 'Rondônia'),
('RR', 'Roraima'),
('SC', 'Santa Catarina'),
('SP', 'São Paulo'),
('SE', 'Sergipe'),
('TO', 'Tocantins')
ON CONFLICT (code) DO NOTHING;

-- Adicionar colunas de endereço na tabela user_profiles
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS street TEXT,
ADD COLUMN IF NOT EXISTS number TEXT,
ADD COLUMN IF NOT EXISTS neighborhood TEXT,
ADD COLUMN IF NOT EXISTS cep TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS city_ibge_code VARCHAR(7);

-- Inserir algumas cidades principais para teste (você pode expandir esta lista)
INSERT INTO public.cities (ibge_code, name, state_code) VALUES
('1100015', 'Alta Floresta D''Oeste', 'RO'),
('1100023', 'Ariquemes', 'RO'),
('1100031', 'Cabixi', 'RO'),
('1100049', 'Cacoal', 'RO'),
('1100056', 'Cerejeiras', 'RO'),
('1100064', 'Colorado do Oeste', 'RO'),
('1100072', 'Corumbiara', 'RO'),
('1100080', 'Costa Marques', 'RO'),
('1100098', 'Espigão D''Oeste', 'RO'),
('1100106', 'Guajará-Mirim', 'RO'),
('1100114', 'Jaru', 'RO'),
('1100122', 'Ji-Paraná', 'RO'),
('1100130', 'Machadinho D''Oeste', 'RO'),
('1100148', 'Nova Brasilândia D''Oeste', 'RO'),
('1100155', 'Ouro Preto do Oeste', 'RO'),
('1100189', 'Pimenta Bueno', 'RO'),
('1100205', 'Porto Velho', 'RO'),
('1100254', 'Presidente Médici', 'RO'),
('1100262', 'Rio Crespo', 'RO'),
('1100288', 'Rolim de Moura', 'RO'),
('1100296', 'Santa Luzia D''Oeste', 'RO'),
('1100304', 'Vilhena', 'RO'),
('1200013', 'Acrelândia', 'AC'),
('1200021', 'Assis Brasil', 'AC'),
('1200039', 'Brasiléia', 'AC'),
('1200047', 'Bujari', 'AC'),
('1200054', 'Capixaba', 'AC'),
('1200062', 'Cruzeiro do Sul', 'AC'),
('1200070', 'Epitaciolândia', 'AC'),
('1200096', 'Feijó', 'AC'),
('1200104', 'Jordão', 'AC'),
('1200138', 'Mâncio Lima', 'AC'),
('1200179', 'Manoel Urbano', 'AC'),
('1200203', 'Marechal Thaumaturgo', 'AC'),
('1200252', 'Plácido de Castro', 'AC'),
('1200302', 'Porto Acre', 'AC'),
('1200328', 'Porto Walter', 'AC'),
('1200336', 'Rio Branco', 'AC'),
('1200344', 'Rodrigues Alves', 'AC'),
('1200351', 'Santa Rosa do Purus', 'AC'),
('1200393', 'Sena Madureira', 'AC'),
('1200401', 'Senador Guiomard', 'AC'),
('1200427', 'Tarauacá', 'AC'),
('1200435', 'Xapuri', 'AC')
ON CONFLICT (ibge_code) DO NOTHING;
