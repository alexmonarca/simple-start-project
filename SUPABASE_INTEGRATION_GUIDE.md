# 🔐 Guia de Integração Supabase - NEWagro Store

## Visão Geral

Este guia descreve como integrar a loja virtual NEWagro com o Supabase para autenticação de usuários e gerenciamento de dados.

---

## 📋 Pré-requisitos

- Projeto Supabase criado: `https://qqzvmwbweuaybkymkldi.supabase.co`
- Chave pública anon: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (já fornecida)
- Acesso ao SQL Editor do Supabase

---

## 🚀 Passo 1: Criar as Tabelas no Supabase

### 1.1 Acessar o SQL Editor

1. Acesse seu projeto Supabase: https://app.supabase.com
2. Vá para **SQL Editor** no menu lateral
3. Clique em **New Query**

### 1.2 Executar o Script SQL

Copie todo o conteúdo do arquivo `SUPABASE_SQL_SETUP.sql` e execute no SQL Editor do Supabase.

**Importante:** Este script cria:
- Tabela de usuários
- Tabela de produtos
- Tabela de carrinho
- Tabela de favoritos
- Tabela de pedidos
- Tabela de endereços
- Políticas de Row Level Security (RLS)

### 1.3 Verificar as Tabelas

Após executar, vá para **Table Editor** e verifique se todas as tabelas foram criadas:
- `users`
- `products`
- `cart_items`
- `favorites`
- `orders`
- `order_items`
- `addresses`
- `woocommerce_sync`

---

## 🔑 Passo 2: Configurar Autenticação no Supabase

### 2.1 Habilitar Email/Password Auth

1. Vá para **Authentication** → **Providers**
2. Certifique-se de que **Email** está habilitado
3. Configure as opções de email (confirmação, recuperação de senha, etc.)

### 2.2 Configurar URLs de Redirecionamento

1. Vá para **Authentication** → **URL Configuration**
2. Adicione as seguintes URLs:
   - **Site URL:** `https://seu-dominio.com` (ou `http://localhost:3000` para desenvolvimento)
   - **Redirect URLs:** 
     - `https://seu-dominio.com/auth/callback`
     - `http://localhost:3000/auth/callback`

---

## 🔌 Passo 3: Integrar com o React

### 3.1 Instalar Biblioteca Supabase

```bash
npm install @supabase/supabase-js
```

### 3.2 Criar Cliente Supabase

Crie um arquivo `client/src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qqzvmwbweuaybkymkldi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxenZtd2J3ZXVheWJreW1rbGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNTAyMDQsImV4cCI6MjA4MzgyNjIwNH0.i9JNHdmJkB-APm8UtgXzCwGLPyyZv4RbRbAICDVR3_A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3.3 Criar Hook de Autenticação

Crie um arquivo `client/src/hooks/useSupabaseAuth.ts`:

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };
}
```

---

## 📊 Passo 4: Estrutura de Dados

### Tabela de Usuários

```sql
id: UUID (Primary Key)
email: VARCHAR(255) - Único
password_hash: VARCHAR(255)
name: VARCHAR(255)
phone: VARCHAR(20)
created_at: TIMESTAMP
updated_at: TIMESTAMP
last_signed_in: TIMESTAMP
```

### Tabela de Produtos

```sql
id: BIGINT (Primary Key)
name: VARCHAR(255)
description: TEXT
category: VARCHAR(100)
price: DECIMAL(10,2)
stock: INTEGER
images: JSONB (array de URLs)
specifications: JSONB (objeto com specs técnicas)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Tabela de Carrinho

```sql
id: BIGINT (Primary Key)
user_id: UUID (Foreign Key → users)
product_id: BIGINT (Foreign Key → products)
quantity: INTEGER
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Tabela de Favoritos

```sql
id: BIGINT (Primary Key)
user_id: UUID (Foreign Key → users)
product_id: BIGINT (Foreign Key → products)
created_at: TIMESTAMP
```

### Tabela de Pedidos

```sql
id: BIGINT (Primary Key)
user_id: UUID (Foreign Key → users)
status: VARCHAR(50) - pending, processing, shipped, delivered
total_amount: DECIMAL(10,2)
shipping_address: TEXT
payment_method: VARCHAR(50)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

---

## 🔒 Segurança - Row Level Security (RLS)

Todas as tabelas têm RLS habilitado. As políticas garantem que:

- **Usuários só veem seus próprios dados** (carrinho, favoritos, pedidos, endereços)
- **Produtos são públicos** (qualquer um pode ler)
- **Apenas o proprietário pode modificar** seus dados

---

## 🔄 Integração com WooCommerce

A tabela `woocommerce_sync` rastreia a sincronização de produtos:

```sql
product_id: BIGINT - ID do produto na NEWagro
woocommerce_product_id: BIGINT - ID do produto no WooCommerce
last_synced: TIMESTAMP - Última sincronização
sync_status: VARCHAR(50) - pending, synced, failed
```

Quando receber a API do WooCommerce, implemente:
1. Buscar produtos do WooCommerce
2. Sincronizar com a tabela `products`
3. Atualizar `woocommerce_sync`

---

## 🧪 Testando a Integração

### Teste 1: Criar Usuário

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'teste@newagrostore.com',
  password: 'senha123',
  options: {
    data: { name: 'Teste NEWagro' }
  }
});
```

### Teste 2: Fazer Login

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'teste@newagrostore.com',
  password: 'senha123'
});
```

### Teste 3: Adicionar ao Carrinho

```typescript
const { data, error } = await supabase
  .from('cart_items')
  .insert({
    user_id: user.id,
    product_id: 1,
    quantity: 2
  });
```

---

## 📞 Suporte

- **Documentação Supabase:** https://supabase.com/docs
- **Autenticação:** https://supabase.com/docs/guides/auth
- **Banco de Dados:** https://supabase.com/docs/guides/database

---

## ✅ Checklist de Implementação

- [ ] Tabelas criadas no Supabase
- [ ] Autenticação configurada
- [ ] URLs de redirecionamento adicionadas
- [ ] Cliente Supabase integrado no React
- [ ] Hook de autenticação criado
- [ ] Páginas de login/registro implementadas
- [ ] Carrinho sincronizado com Supabase
- [ ] Favoritos sincronizados com Supabase
- [ ] Testes de autenticação passando
- [ ] Testes de carrinho passando
