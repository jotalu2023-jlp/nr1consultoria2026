import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Brain } from "lucide-react";

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Shield className="h-4 w-4" />
              Atualização NR1 - Riscos Psicossociais
            </div>
            
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
              <Link to="/downloads">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Acessar Materiais Gratuitos
                </Button>
              </Link>
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
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
              
              <div className="relative bg-card rounded-2xl shadow-2xl p-8 border border-border">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                    <div className="p-3 bg-primary rounded-lg">
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">Conformidade Legal</div>
                      <div className="text-sm text-muted-foreground">NR1 Atualizada</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-xl">
                    <div className="p-3 bg-accent rounded-lg">
                      <Brain className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">Riscos Psicossociais</div>
                      <div className="text-sm text-muted-foreground">Identificação e Gestão</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                    <div className="p-3 bg-foreground rounded-lg">
                      <Users className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="font-semibold">Bem-estar</div>
                      <div className="text-sm text-muted-foreground">Clima Organizacional</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};