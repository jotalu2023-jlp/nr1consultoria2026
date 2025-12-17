import { AlertTriangle, CheckCircle, FileText, Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AboutNR1 = () => {
  return (
    <section id="sobre" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que é a NR1 e os Riscos Psicossociais?
          </h2>
          <p className="text-muted-foreground text-lg">
            A Norma Regulamentadora nº 1 foi atualizada para incluir a obrigatoriedade 
            de identificação e gestão dos riscos psicossociais no ambiente de trabalho.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>A Atualização da NR1</CardTitle>
              <CardDescription>
                Novas exigências para empresas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A partir de 2024, todas as empresas devem incluir em seu Programa de 
                Gerenciamento de Riscos (PGR) a identificação e avaliação dos riscos 
                psicossociais relacionados ao trabalho.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Obrigatoriedade de mapeamento dos riscos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Inclusão no inventário de riscos do PGR</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Plano de ação para mitigação</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
                <AlertTriangle className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Riscos Psicossociais</CardTitle>
              <CardDescription>
                Fatores que afetam a saúde mental
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                São fatores do ambiente de trabalho que podem causar danos à saúde 
                mental e física dos colaboradores, impactando produtividade e 
                bem-estar organizacional.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Sobrecarga e pressão excessiva</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Assédio moral e conflitos interpessoais</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Falta de autonomia e reconhecimento</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
            <div className="p-4 bg-destructive/10 rounded-full">
              <Scale className="h-8 w-8 text-destructive" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-2">Atenção: Penalidades por Não Conformidade</h3>
              <p className="text-muted-foreground">
                O descumprimento das exigências da NR1 pode resultar em multas, interdições, 
                ações trabalhistas e danos à reputação da empresa. A fiscalização está cada 
                vez mais rigorosa.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};