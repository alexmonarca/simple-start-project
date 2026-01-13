import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envio de email
    console.log("Formulário enviado:", formData);
    alert("Mensagem recebida! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

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
            <Link href="/sobre" className="text-foreground hover:text-accent transition">Sobre</Link>
            <Link href="/contato" className="text-foreground hover:text-accent transition font-semibold text-accent">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-secondary py-16 text-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-lg opacity-90">Estamos aqui para ajudar com suas dúvidas e necessidades</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Atendimento rápido via WhatsApp</p>
                <a href="https://wa.me/5599619426" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                  (55) 99619-4261
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Envie suas dúvidas por email</p>
                <a href="mailto:contato@newagrostore.com.br" className="text-accent font-semibold hover:underline">
                  contato@newagrostore.com.br
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Visite nosso escritório</p>
                <p className="text-accent font-semibold">
                  São Borja - RS<br />
                  Brasil
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-accent" />
                  Instagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Siga nosso trabalho nas redes</p>
                <a href="https://instagram.com/newagrosb" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                  @newagrosb
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Envie uma Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefone/WhatsApp</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(55) 99619-4261"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Assunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="produtos">Dúvida sobre Produtos</option>
                    <option value="servicos">Solicitar Serviço</option>
                    <option value="orcamento">Solicitar Orçamento</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva sua dúvida ou necessidade..."
                    rows={5}
                    className="w-full px-3 py-2 border border-border rounded-lg resize-none"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            {/* FAQ or Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Informações Úteis</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-accent" />
                      Horário de Atendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 08:00 - 18:00<br />
                      Sábado: 08:00 - 12:00<br />
                      Domingo: Fechado
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Atendimento Técnico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Para atendimento técnico em campo, entre em contato via WhatsApp para agendar um horário.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://wa.me/5599619426" target="_blank" rel="noopener noreferrer">
                        Agendar Atendimento
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dúvidas Frequentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Qual é o prazo de entrega?</li>
                      <li>• Vocês fazem atendimento em minha região?</li>
                      <li>• Como funciona a garantia dos produtos?</li>
                      <li>• Qual é o custo do atendimento técnico?</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Nossa Localização</h2>
          <div className="bg-white rounded-lg h-96 flex items-center justify-center border border-border">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">São Borja - RS, Brasil</p>
              <p className="text-sm text-muted-foreground mt-2">Mapa será integrado em breve</p>
            </div>
          </div>
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
                <Instagram className="w-6 h-6" />
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
