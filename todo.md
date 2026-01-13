# NEWagro Store - TODO

## Funcionalidades Obrigatórias

### Autenticação e Usuários
- [x] Integração com Supabase para autenticação (via Manus OAuth)
- [x] Sistema de login com email/senha
- [x] Sistema de registro de novos usuários
- [x] Sistema de logout
- [ ] Recuperação de senha
- [x] Proteção de rotas autenticadas

### Catálogo de Produtos
- [x] Schema de produtos no banco de dados
- [x] Listagem de produtos com paginação
- [ ] Busca de produtos por nome/descrição (estrutura pronta)
- [x] Filtros por categoria
- [ ] Filtros por faixa de preço
- [ ] Ordenação (preço, popularidade, mais recentes)

### Página de Detalhes do Produto
- [x] Exibição de imagens do produto
- [x] Descrição completa
- [x] Especificações técnicas
- [x] Preço e disponibilidade
- [ ] Avaliações/comentários (futuro)
- [x] Botão para adicionar ao carrinho
- [x] Botão para adicionar aos favoritos

### Carrinho de Compras
- [x] Schema de carrinho no banco de dados
- [x] Adicionar produtos ao carrinho
- [x] Remover produtos do carrinho
- [x] Atualizar quantidade de produtos
- [x] Persistência do carrinho no banco
- [x] Cálculo de subtotal e total
- [x] Visualização do carrinho
- [ ] Checkout (estrutura preparada para pagamento)

### Lista de Favoritos
- [x] Schema de favoritos no banco de dados
- [x] Adicionar produtos aos favoritos
- [x] Remover produtos dos favoritos
- [x] Visualizar lista de favoritos
- [x] Persistência no banco de dados
- [x] Indicador visual de favoritos

### Painel de Conta do Usuário
- [x] Visualização de perfil do usuário
- [ ] Edição de dados pessoais (requer backend adicional)
- [x] Histórico de pedidos
- [x] Detalhes de pedidos anteriores
- [ ] Endereços salvos (estrutura pronta)
- [ ] Preferências de conta

### Design e UX
- [x] Paleta de cores verde/terra (identidade agrícola)
- [x] Layout responsivo (mobile, tablet, desktop)
- [x] Navegação intuitiva
- [x] Header com logo e menu
- [x] Footer com informações
- [x] Página inicial atrativa
- [x] Componentes reutilizáveis (shadcn/ui)

### Integrações Futuras
- [x] Estrutura preparada para DINTEC Sistemas (gestão de estoque)
- [x] Estrutura preparada para Stripe/sistema de pagamento
- [ ] Documentação de API para integrações
- [ ] Endpoints prontos para webhooks

### Testes e Qualidade
- [ ] Testes unitários com Vitest
- [ ] Testes de autenticação
- [ ] Testes de operações de carrinho
- [ ] Testes de busca e filtros
- [ ] Documentação técnica (em progresso)

## Progresso

**Status Geral:** Desenvolvimento em andamento
**Última Atualização:** Fase 7 - Interface de usuário implementada
**Funcionalidades Completadas:** 30 de 40
**Próximas Tarefas:** Testes, integração com pagamento, otimizações


## Atualizações Recentes (Fase 8)

### Identidade Visual
- [x] Adicionar logo oficial da NEWagro ao header
- [x] Atualizar cor verde para #02a75b em toda a paleta
- [ ] Atualizar favicon com logo NEWagro
- [x] Revisar contraste de cores com novo verde

### Integração WooCommerce
- [ ] Criar serviço de integração com WooCommerce REST API
- [ ] Implementar autenticação com WooCommerce
- [ ] Criar helpers para sincronizar produtos
- [ ] Criar helpers para sincronizar estoque
- [ ] Implementar webhook para atualizar pedidos
- [ ] Testar fluxo completo: React → WooCommerce → DINTEC


## Fase 9 - Remoção de Autenticação e Novas Páginas

### Autenticação
- [x] Remover Manus OAuth de todas as rotas
- [x] Remover proteção de rotas (publicar tudo)
- [x] Remover hooks de autenticação
- [x] Simplificar fluxo de carrinho (sem login)

### Novas Páginas
- [x] Criar página de Serviços
- [x] Criar página Sobre
- [x] Criar página Contato
- [x] Atualizar navegação para linkar novas páginas

### Integração WooCommerce
- [ ] Criar serviço de integração com WooCommerce API
- [ ] Implementar busca de produtos do WooCommerce
- [ ] Preparar sincronização de estoque
- [ ] Documentar endpoints esperados


## Fase 10 - Integração Supabase e Autenticação

### Redes Sociais
- [x] Adicionar link Instagram @newagrosb na página Contato
- [x] Adicionar link Instagram @newagrosb no rodapé
- [x] Adicionar ícone do Instagram

### Autenticação Supabase
- [x] Configurar credenciais do Supabase no projeto
- [x] Implementar login com email + senha
- [x] Implementar registro de novos usuários
- [x] Implementar logout (hook pronto)
- [ ] Proteger rotas que precisam de autenticação

### Banco de Dados Supabase
- [x] Criar tabelas de usuários (SQL script pronto)
- [x] Criar tabelas de carrinho (SQL script pronto)
- [x] Criar tabelas de favoritos (SQL script pronto)
- [x] Criar tabelas de pedidos (SQL script pronto)
- [x] Fornecer SQL scripts para o usuário (SUPABASE_SQL_SETUP.sql)
- [x] Fornecer guia de integração (SUPABASE_INTEGRATION_GUIDE.md)
