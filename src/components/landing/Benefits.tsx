import { TrendingUp, Shield, Heart, Award, Clock, Banknote } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Conformidade Legal",
    description: "Proteção contra multas e penalidades por descumprimento das normas regulamentadoras.",
  },
  {
    icon: TrendingUp,
    title: "Aumento de Produtividade",
    description: "Colaboradores saudáveis e motivados entregam resultados superiores.",
  },
  {
    icon: Heart,
    title: "Redução de Afastamentos",
    description: "Diminuição significativa de licenças médicas por problemas de saúde mental.",
  },
  {
    icon: Banknote,
    title: "Redução de Custos",
    description: "Menos turnover, processos trabalhistas e gastos com substituições.",
  },
  {
    icon: Award,
    title: "Employer Branding",
    description: "Fortalecimento da marca empregadora e atração de talentos.",
  },
  {
    icon: Clock,
    title: "Clima Organizacional",
    description: "Ambiente de trabalho mais saudável e colaborativo.",
  },
];

export const Benefits = () => {
  return (
    <section id="beneficios" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefícios para sua Empresa
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Investir na gestão de riscos psicossociais traz retorno direto para 
            o negócio e para as pessoas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-6 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="p-3 bg-primary-foreground/10 rounded-lg flex-shrink-0">
                <benefit.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};