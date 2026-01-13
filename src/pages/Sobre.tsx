import { Link } from "react-router-dom";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">NEWagro</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition">Produtos</Link>
            <Link to="/servicos" className="text-foreground hover:text-primary transition">Serviços</Link>
            <Link to="/sobre" className="text-primary font-semibold">Sobre</Link>
            <Link to="/contato" className="text-foreground hover:text-primary transition">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a NEWagro</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Conheça nossa história e nossa missão de transformar a agricultura brasileira.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg">
            <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
            <p className="text-muted-foreground mb-6">
              A NEWagro nasceu da paixão pela agricultura e pela tecnologia. Fundada em São Borja - RS, 
              somos especialistas em soluções de agricultura de precisão, ajudando produtores rurais a 
              maximizar sua produtividade e reduzir custos operacionais.
            </p>

            <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-muted-foreground mb-6">
              Democratizar o acesso à tecnologia agrícola de ponta, oferecendo produtos e serviços 
              de qualidade com suporte técnico especializado.
            </p>

            <h2 className="text-2xl font-bold mb-4">Nossos Valores</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Qualidade e excelência em tudo que fazemos</li>
              <li>Compromisso com o sucesso do produtor rural</li>
              <li>Inovação constante em soluções agrícolas</li>
              <li>Atendimento personalizado e humanizado</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}