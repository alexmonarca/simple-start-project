import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { toast } from "sonner";

export default function Account() {
  const { user, isAuthenticated, signOut, loading } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Você saiu da sua conta");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Erro ao sair");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Você precisa estar logado</h1>
          <Button asChild>
            <Link to="/login">Fazer Login</Link>
          </Button>
        </div>
      </div>
    );
  }

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

      {/* Account Info */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">Informações da Conta</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="font-medium">{user?.email}</p>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">ID da Conta</label>
                <p className="font-mono text-sm">{user?.id}</p>
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="destructive" onClick={handleSignOut}>
                  Sair da Conta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}