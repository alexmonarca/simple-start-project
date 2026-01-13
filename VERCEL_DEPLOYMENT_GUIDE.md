# Guia de Deploy no Vercel - NEWagro Store

## Configuração Realizada

Foram criados os seguintes arquivos para otimizar o deploy no Vercel:

### 1. **vercel.json**
Arquivo de configuração do Vercel com:
- Comando de build: `pnpm build`
- Diretório de saída: `dist`
- Reescrita de rotas para SPA (Single Page Application)
- Configuração de Node.js 22.x

### 2. **vite.config.ts** (Atualizado)
Otimizações de build:
- Code splitting automático para reduzir tamanho de chunks
- Separação de vendors (React, UI, tRPC, Supabase)
- Limite de aviso de chunk aumentado para 1000kB

### 3. **package.json** (Atualizado)
- Especificação de engines: Node.js 22.x e pnpm 10.x
- Scripts de build e start configurados

---

## Passos para Deploy

### 1. Fazer Push no GitHub
```bash
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

### 2. Conectar no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório GitHub (newagrostore)
4. Vercel detectará automaticamente as configurações

### 3. Configurar Variáveis de Ambiente
No painel do Vercel, adicione as seguintes variáveis em **Settings → Environment Variables**:

```
DATABASE_URL=<sua_url_do_banco_manus>
JWT_SECRET=<seu_jwt_secret>
VITE_APP_ID=<seu_app_id>
OAUTH_SERVER_URL=<url_oauth>
VITE_OAUTH_PORTAL_URL=<url_portal>
OWNER_OPEN_ID=<owner_id>
OWNER_NAME=<owner_name>
BUILT_IN_FORGE_API_URL=<api_url>
BUILT_IN_FORGE_API_KEY=<api_key>
VITE_FRONTEND_FORGE_API_KEY=<frontend_key>
VITE_FRONTEND_FORGE_API_URL=<frontend_api_url>
VITE_ANALYTICS_ENDPOINT=<analytics_endpoint>
VITE_ANALYTICS_WEBSITE_ID=<analytics_id>
```

### 4. Configurar URLs de Redirecionamento no Supabase
Após o deploy, você receberá uma URL do Vercel (ex: `https://newagrostore.vercel.app`).

No painel do Supabase:
1. Vá para **Authentication → URL Configuration**
2. Adicione em **Redirect URLs**:
   - `https://newagrostore.vercel.app/login`
   - `https://newagrostore.vercel.app/registro`
   - `https://newagrostore.vercel.app/`

### 5. Deploy
1. Clique em "Deploy" no painel do Vercel
2. Aguarde a compilação (normalmente 2-5 minutos)
3. Acesse a URL gerada para testar

---

## Testando o Deploy

### 1. Verificar se o site está funcionando
- Acesse a URL do Vercel
- Verifique se o header, logo e navegação aparecem corretamente

### 2. Testar Autenticação Supabase
- Clique em "Registrar"
- Crie uma conta com email e senha
- Verifique se consegue fazer login

### 3. Testar Carrinho
- Navegue até "Produtos"
- Adicione um produto ao carrinho
- Verifique se o carrinho persiste

---

## Solução de Problemas

### Erro: "Cannot find module"
- Verifique se todas as dependências estão no `package.json`
- Execute `pnpm install` localmente e teste com `pnpm build`

### Erro: "Variáveis de ambiente não definidas"
- Confirme que todas as variáveis foram adicionadas no Vercel
- Redeploy após adicionar variáveis

### Erro: "Chunks muito grandes"
- Já foi otimizado no `vite.config.ts`
- Se persistir, aumente `chunkSizeWarningLimit` em vite.config.ts

### Erro: "Supabase connection failed"
- Verifique se a URL do Supabase está correta em `client/src/lib/supabase.ts`
- Confirme que a chave anon é válida
- Verifique se as URLs de redirecionamento estão configuradas no Supabase

---

## Próximos Passos

### 1. Comprar Domínio Customizado
- Você pode comprar um domínio diretamente no Vercel
- Ou conectar um domínio existente

### 2. Configurar Domínio no Supabase
- Após comprar o domínio, adicione as URLs de redirecionamento do novo domínio no Supabase

### 3. Integração com WooCommerce
- Quando receber resposta da DINTEC, configure a integração de produtos
- Atualize as credenciais de banco de dados se migrar para Supabase

---

## Monitoramento

### Logs do Vercel
- Acesse **Deployments** para ver logs de build
- Acesse **Functions** para ver logs de runtime

### Métricas
- Verifique **Analytics** para tráfego e performance
- Use **Web Vitals** para monitorar performance

---

## Suporte

Se encontrar problemas:
1. Verifique os logs do Vercel
2. Teste localmente com `pnpm dev`
3. Verifique as variáveis de ambiente
4. Consulte a documentação do Vercel: https://vercel.com/docs
