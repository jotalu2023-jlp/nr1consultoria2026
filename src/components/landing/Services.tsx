import { ClipboardCheck, GraduationCap, FileSearch, HeartPulse, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: FileSearch,
    title: "Diagnóstico Organizacional",
    description: "Avaliação completa do ambiente de trabalho para identificação dos riscos psicossociais existentes.",
    features: ["Análise documental", "Entrevistas e questionários", "Relatório detalhado"],
  },
  {
    icon: ClipboardCheck,
    title: "Adequação ao PGR",
    description: "Elaboração e atualização do Programa de Gerenciamento de Riscos conforme as novas exigências.",
    features: ["Inventário de riscos", "Plano de ação", "Documentação completa"],
  },
  {
    icon: GraduationCap,
    title: "Treinamentos",
    description: "Capacitação de gestores e colaboradores sobre riscos psicossociais e prevenção.",
    features: ["Liderança saudável", "Comunicação não-violenta", "Gestão de conflitos"],
  },
  {
    icon: HeartPulse,
    title: "Programa de Bem-estar",
    description: "Implementação de programas para promoção da saúde mental no ambiente corporativo.",
    features: ["Apoio psicológico", "Qualidade de vida", "Prevenção ao burnout"],
  },
  {
    icon: Users,
    title: "Consultoria Contínua",
    description: "Acompanhamento periódico para garantir a manutenção da conformidade e melhoria contínua.",
    features: ["Visitas técnicas", "Revisões periódicas", "Suporte especializado"],
  },
  {
    icon: BarChart3,
    title: "Indicadores e Métricas",
    description: "Desenvolvimento de indicadores para monitoramento da saúde organizacional.",
    features: ["Dashboard gerencial", "KPIs de bem-estar", "Relatórios executivos"],
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-lg">
            Soluções completas para adequação à NR1 e gestão de riscos psicossociais, 
            adaptadas à realidade de cada organização.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};