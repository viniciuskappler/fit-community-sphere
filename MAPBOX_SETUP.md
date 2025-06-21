

# Configuração do Mapbox

Este projeto utiliza MapLibre GL JS com tiles do Mapbox para renderização de mapas.

## Token Configurado

O projeto já está configurado com um token público do Mapbox para o usuário `nucleodoesporte`.

Token atual: `pk.eyJ1IjoibnVjbGVvZG9lc3BvcnRlIiwiYSI6ImNtYzZwZ2c5eDE1d2YybHB2ajBuNHhxazAifQ.TEFso7cSuwZuiqdTUiyLgw`

## Configuração Alternativa

Para usar um token diferente, você pode:

### 1. Variável de Ambiente (Recomendado para produção)
Crie um arquivo `.env.local` na raiz do projeto:
```
VITE_MAPBOX_TOKEN=pk.seu_token_aqui
```

### 2. Interface do Usuário
Se não configurar a variável de ambiente, o componente solicitará o token via interface.

## Funcionalidades Implementadas

- ✅ Renderização de mapas responsivos
- ✅ Marcadores customizados para estabelecimentos (🏋️) e grupos (👥)
- ✅ Popups informativos com animações
- ✅ Navegação e zoom
- ✅ Carregamento dinâmico de dados
- ✅ Fallback para entrada manual de token
- ✅ Controles de navegação
- ✅ Efeitos hover nos marcadores
- ✅ Abertura de detalhes em nova aba

## Custos

O Mapbox oferece:
- **50.000 map loads web gratuitos** por mês
- **25.000 MAU mobile gratuitos** por mês

## Segurança

- Use apenas tokens **públicos** (pk.*) no frontend
- Tokens privados (sk.*) devem ser usados apenas no backend
- Configure variáveis de ambiente para produção
