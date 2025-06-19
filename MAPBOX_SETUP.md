
# Configuração do Mapbox

Este projeto utiliza MapLibre GL JS com tiles do Mapbox para renderização de mapas.

## Configuração do Token

Para que os mapas funcionem corretamente, você precisa configurar um token público do Mapbox:

### 1. Obter Token do Mapbox

1. Acesse [mapbox.com](https://account.mapbox.com/access-tokens/)
2. Faça login ou crie uma conta
3. Crie um novo token público com escopo `Styles:Read`
4. Copie o token (começará com `pk.`)

### 2. Configurar Token

Você pode configurar o token de duas formas:

#### Opção A: Variável de Ambiente (Recomendado)
Crie um arquivo `.env.local` na raiz do projeto:
```
VITE_MAPBOX_TOKEN=pk.eyJ1IjoibXl1c2VybmFtZSIsImEiOiJja...
```

#### Opção B: Interface do Usuário
Se não configurar a variável de ambiente, o componente solicitará o token via interface.

## Custos

O Mapbox oferece:
- **50.000 map loads web gratuitos** por mês
- **25.000 MAU mobile gratuitos** por mês

Para projetos maiores, considere:
- MapTiler (alternativa compatível)
- Tile server próprio (OpenStreetMap + MapLibre)

## Funcionalidades Implementadas

- ✅ Renderização de mapas responsivos
- ✅ Marcadores customizados para estabelecimentos (🏋️) e grupos (👥)
- ✅ Popups informativos
- ✅ Navegação e zoom
- ✅ Carregamento dinâmico de dados
- ✅ Fallback para entrada manual de token

## Migração do Google Maps

Esta implementação substitui completamente o Google Maps, removendo:
- Dependências `@googlemaps/js-api-loader`
- Scripts de carregamento do Google Maps
- Componentes baseados em `google.maps.*`
- Variáveis de ambiente do Google Maps

A funcionalidade permanece idêntica com melhor performance e menor custo.
