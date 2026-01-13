import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Zap, Target } from "lucide-react";
import { Link } from "wouter";

export default function Sobre() {
  const diferenciais = [
    {
      icon: Award,
      title: "Expertise Técnica",
      description: "Equipe altamente qualificada com anos de experiência em agricultura de precisão"
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Soluções customizadas para cada cliente e tipo de operação agrícola"
    },
    {
      icon: Zap,
      title: "Tecnologia de Ponta",
      description: "Integração com as principais marcas e tecnologias do mercado agrícola"
    },
    {
      icon: Target,
      title: "Resultados Comprovados",
      description: "Aumento de produtividade e redução de custos para nossos clientes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-newagrostore.png" alt="NEWagro" className="h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition">Produtos</Link>
            <Link href="/servicos" className="text-foreground hover:text-accent transition">Serviços</Link>
            <Link href="/sobre" className="text-foreground hover:text-accent transition font-semibold text-accent">Sobre</Link>
            <Link href="/contato" className="text-foreground hover:text-accent transition">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-secondary py-16 text-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a NEWagro</h1>
          <p className="text-lg opacity-90">Liderança em soluções de agricultura de precisão</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Quem Somos</h2>
              <p className="text-lg text-muted-foreground mb-4">
                A NEWagro é uma empresa especializada em agricultura de precisão, oferecendo soluções completas em tecnologia agrícola, assistência técnica especializada e venda de equipamentos de ponta.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Com uma equipe de profissionais altamente qualificados, atendemos produtores rurais e empresas do agronegócio em todo o Brasil, fornecendo suporte técnico em campo e soluções personalizadas para maximizar a produtividade.
              </p>
              <p className="text-lg text-muted-foreground">
                Nosso compromisso é oferecer tecnologia aplicada com eficiência, reduzindo custos e desperdícios, enquanto aumentamos a produtividade das operações agrícolas.
              </p>
            </div>
            <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
              <img src="/logo-newagrostore.png" alt="NEWagro" className="w-2/3 h-auto opacity-50" />
            </div>
          </div>

          {/* Diferenciais */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Nossos Diferenciais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {diferenciais.map((diferencial, index) => {
                const Icon = diferencial.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <Icon className="w-12 h-12 text-accent" />
                      </div>
                      <CardTitle>{diferencial.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{diferencial.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Marcas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Marcas Atendidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {["Hexagon", "Trimble", "John Deere", "Jacto"].map((marca, index) => (
                <div key={index} className="bg-white border border-border rounded-lg p-8 flex items-center justify-center">
                  <span className="font-semibold text-lg text-foreground">{marca}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">+ Atendimento multimarcas para outras soluções agrícolas</p>
          </div>

          {/* Valores */}
          <div className="bg-accent/10 rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2 text-accent">Confiabilidade</h3>
                <p className="text-muted-foreground">Compromisso com a qualidade e transparência em todas as operações</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-accent">Inovação</h3>
                <p className="text-muted-foreground">Adoção contínua de novas tecnologias e melhores práticas agrícolas</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-accent">Excelência</h3>
                <p className="text-muted-foreground">Dedicação ao atendimento de excelência e resultados comprovados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-white py-16 mt-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Conheça Nossas Soluções</h2>
          <p className="text-lg mb-8 opacity-90">Explore nossos produtos e serviços especializados</p>
          <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
            <Link href="/">Ver Catálogo</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
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
                <li><Link href="/sobre" className="hover:opacity-100">Sobre</Link></li>
                <li><Link href="/servicos" className="hover:opacity-100">Serviços</Link></li>
                <li><Link href="/contato" className="hover:opacity-100">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-sm opacity-75 mb-2">WhatsApp: (55) 99619-4261</p>
              <p className="text-sm opacity-75">São Borja - RS</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <div className="flex justify-center gap-6 mb-6">
              <a href="https://instagram.com/newagrosb" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
              </a>
            </div>
            <div className="text-center text-sm opacity-75">
              <p>&copy; 2026 NEWagro. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
