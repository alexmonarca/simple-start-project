import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Phone, Mail, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock products for demo
const mockProducts = [
  {
    id: 1,
    name: "Piloto Automático TopCon X35",
    description: "Sistema de piloto automático de alta precisão para tratores",
    price: "45000.00",
    stock: 5,
    category: "Piloto Automático",
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400"]
  },
  {
    id: 2,
    name: "GPS Agrícola Trimble",
    description: "Sistema GPS RTK para agricultura de precisão",
    price: "28000.00",
    stock: 3,
    category: "GPS Agrícola",
    images: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400"]
  },
  {
    id: 3,
    name: "Pulverizador John Deere",
    description: "Pulverizador autopropelido com sistema de barra inteligente",
    price: "125000.00",
    stock: 2,
    category: "Pulverizadores",
    images: ["https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400"]
  },
  {
    id: 4,
    name: "Kit de Acessórios GPS",
    description: "Kit completo de acessórios para instalação de GPS agrícola",
    price: "3500.00",
    stock: 15,
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"]
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { user, isAuthenticated, signOut, loading: authLoading } = useSupabaseAuth();

  const categories = ["Piloto Automático", "Pulverizadores", "GPS Agrícola", "Acessórios", "Serviços"];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">NEWagro</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition">Produtos</Link>
            <Link to="/servicos" className="text-foreground hover:text-primary transition">Serviços</Link>
            <Link to="/sobre" className="text-foreground hover:text-primary transition">Sobre</Link>
            <Link to="/contato" className="text-foreground hover:text-primary transition">Contato</Link>
          </nav>

          <div className="flex items-center gap-4">
            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Minha Conta
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login" className="text-sm text-foreground hover:text-primary transition">Entrar</Link>
                <Link to="/registro" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition">Registrar</Link>
              </>
            )}
            <Link to="/cart" className="text-foreground hover:text-primary transition">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Tecnologia Agrícola de Precisão</h2>
            <p className="text-lg mb-8 opacity-90">Soluções completas em agricultura de precisão, piloto automático e sistemas de pulverização para maximizar sua produtividade.</p>
            <Button size="lg" className="bg-card text-primary hover:bg-card/90">
              Explorar Catálogo
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-card border-b border-border py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || undefined)}
              className="px-4 py-2 border border-border rounded-lg bg-card"
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Catálogo de Produtos</h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition overflow-hidden">
                  {product.images && product.images.length > 0 && (
                    <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">
                        R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded ${product.stock > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                        {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        disabled={product.stock === 0}
                      >
                        Ver Detalhes
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Suporte Técnico?</h2>
          <p className="text-lg mb-8 opacity-90">Entre em contato conosco para assistência especializada em agricultura de precisão</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-card text-primary hover:bg-card/90">
              <Phone className="w-4 h-4 mr-2" />
              (55) 99619-4261
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">NEWagro</h3>
              <p className="text-sm opacity-75">Soluções em agricultura de precisão</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100">Piloto Automático</a></li>
                <li><a href="#" className="hover:opacity-100">Pulverizadores</a></li>
                <li><a href="#" className="hover:opacity-100">GPS Agrícola</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link to="/sobre" className="hover:opacity-100">Sobre</Link></li>
                <li><Link to="/servicos" className="hover:opacity-100">Serviços</Link></li>
                <li><Link to="/contato" className="hover:opacity-100">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-sm opacity-75 mb-2">WhatsApp: (55) 99619-4261</p>
              <p className="text-sm opacity-75">São Borja - RS</p>
            </div>
          </div>
          <div className="border-t border-background/10 pt-8">
            <div className="text-center text-sm opacity-75">
              <p>&copy; 2026 NEWagro. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}