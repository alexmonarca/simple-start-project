-- ============================================
-- NEWagro Store - Supabase SQL Setup
-- ============================================
-- Execute estes comandos no SQL Editor do Supabase
-- para criar todas as tabelas necessárias

-- ============================================
-- 1. TABELA DE USUÁRIOS
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_signed_in TIMESTAMP DEFAULT NOW()
);

-- Criar índice para email para buscas rápidas
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- 2. TABELA DE PRODUTOS
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  images JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índice para categoria e busca
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- ============================================
-- 3. TABELA DE CARRINHO
-- ============================================
CREATE TABLE IF NOT EXISTS cart_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Criar índice para usuário
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);

-- ============================================
-- 4. TABELA DE FAVORITOS
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Criar índice para usuário
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);

-- ============================================
-- 5. TABELA DE PEDIDOS
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índice para usuário e status
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ============================================
-- 6. TABELA DE ITENS DO PEDIDO
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar índice para pedido
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ============================================
-- 7. TABELA DE ENDEREÇOS
-- ============================================
CREATE TABLE IF NOT EXISTS addresses (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) DEFAULT 'shipping',
  street VARCHAR(255) NOT NULL,
  number VARCHAR(10) NOT NULL,
  complement VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índice para usuário
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);

-- ============================================
-- 8. TABELA DE INTEGRAÇÃO COM WOOCOMMERCE
-- ============================================
CREATE TABLE IF NOT EXISTS woocommerce_sync (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  woocommerce_product_id BIGINT,
  last_synced TIMESTAMP DEFAULT NOW(),
  sync_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índice para sincronização
CREATE INDEX IF NOT EXISTS idx_woocommerce_sync_product_id ON woocommerce_sync(product_id);

-- ============================================
-- 9. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS na tabela de usuários
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Habilitar RLS na tabela de carrinho
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seu próprio carrinho
CREATE POLICY "Users can view own cart" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

-- Política: Usuários podem inserir no seu próprio carrinho
CREATE POLICY "Users can insert own cart items" ON cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar seu próprio carrinho
CREATE POLICY "Users can update own cart items" ON cart_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Política: Usuários podem deletar do seu próprio carrinho
CREATE POLICY "Users can delete own cart items" ON cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Habilitar RLS na tabela de favoritos
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios favoritos
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

-- Política: Usuários podem inserir seus próprios favoritos
CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem deletar seus próprios favoritos
CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Habilitar RLS na tabela de pedidos
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios pedidos
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Habilitar RLS na tabela de endereços
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios endereços
CREATE POLICY "Users can view own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

-- Política: Usuários podem inserir seus próprios endereços
CREATE POLICY "Users can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar seus próprios endereços
CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

-- Política: Usuários podem deletar seus próprios endereços
CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 10. DADOS DE EXEMPLO (OPCIONAL)
-- ============================================
-- Descomente para inserir produtos de exemplo

/*
INSERT INTO products (name, description, category, price, stock, specifications) VALUES
(
  'Piloto Automático Hexagon',
  'Sistema de piloto automático de precisão para máquinas agrícolas',
  'Piloto Automático',
  15000.00,
  5,
  '{"marca": "Hexagon", "modelo": "AgriTech", "precisao": "2.5cm"}'::jsonb
),
(
  'GPS Agrícola Trimble',
  'Receptor GPS de alta precisão para agricultura de precisão',
  'GPS Agrícola',
  8000.00,
  10,
  '{"marca": "Trimble", "modelo": "CFX-750", "canais": 120}'::jsonb
),
(
  'Pulverizador Jacto',
  'Pulverizador com sistema de calibração automática',
  'Pulverizadores',
  12000.00,
  3,
  '{"marca": "Jacto", "modelo": "Condor", "capacidade": "3000L"}'::jsonb
);
*/

-- ============================================
-- FIM DO SETUP
-- ============================================
