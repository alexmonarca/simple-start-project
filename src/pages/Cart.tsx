import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">NEWagro</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition">Produtos</Link>
            <Link to="/servicos" className="text-foreground hover:text-primary transition">Serviços</Link>
            <Link to="/sobre" className="text-foreground hover:text-primary transition">Sobre</Link>
            <Link to="/contato" className="text-foreground hover:text-primary transition">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Empty Cart */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
          
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">Adicione produtos ao carrinho para continuar comprando.</p>
            <Button asChild>
              <Link to="/">Ver Produtos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}