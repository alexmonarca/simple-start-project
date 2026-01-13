import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Wrench, Settings, MapPin, Headphones } from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Instalação de Piloto Automático",
    description: "Instalação profissional de sistemas de piloto automático em tratores e colheitadeiras de todas as marcas."
  },
  {
    icon: Wrench,
    title: "Manutenção Preventiva",
    description: "Serviços de manutenção preventiva para garantir o funcionamento ideal dos seus equipamentos."
  },
  {
    icon: MapPin,
    title: "Mapeamento de Lavouras",
    description: "Serviços de mapeamento e georreferenciamento de propriedades rurais com alta precisão."
  },
  {
    icon: Headphones,
    title: "Suporte Técnico",
    description: "Suporte técnico especializado para configuração e solução de problemas em campo."
  }
];

export default function Servicos() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">NEWagro</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition">Produtos</Link>
            <Link to="/servicos" className="text-primary font-semibold">Serviços</Link>
            <Link to="/sobre" className="text-foreground hover:text-primary transition">Sobre</Link>
            <Link to="/contato" className="text-foreground hover:text-primary transition">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Oferecemos serviços especializados em agricultura de precisão para maximizar a produtividade da sua lavoura.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}