import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Brain } from "lucide-react";
import heroImage from "@/assets/hero-nr1.png";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <a 
              href="https://coral-marten-849774.hostingersite.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <Shield className="h-4 w-4" />
              Atualização NR1 - Riscos Psicossociais
            </a>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Proteja sua empresa e seus{" "}
              <span className="text-gradient">colaboradores</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Consultoria especializada para adequação à NR1 e gestão de riscos 
              psicossociais no ambiente de trabalho. Garanta conformidade legal 
              e bem-estar organizacional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={scrollToContact} className="group">
                Solicitar Consultoria
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Empresas Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Anos Experiência</div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="NR1 Riscos Psicossociais no Ambiente Corporativo - Antes e Depois" 
                className="relative w-full rounded-2xl shadow-2xl border border-border object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};