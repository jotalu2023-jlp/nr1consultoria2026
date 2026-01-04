import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">NR1 Consultoria</span>
            </div>
            <p className="text-background/70 text-sm">
              Especialistas em adequação à NR1 e gestão de riscos psicossociais 
              para empresas de todos os portes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#sobre" className="hover:text-background transition-colors">
                  Sobre NR1
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-background transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-background transition-colors">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-background transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>(31) 99543-8782</li>
              <li>jotalu2014@gmail.com</li>
              <li>
                <a href="https://www.nr1consultoria.online" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  www.nr1consultoria.online
                </a>
              </li>
              <li>Belo Horizonte, MG - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} NR1 Consultoria. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvido por <span className="font-semibold">No&Pe - Empreendimentos</span> | (31) 99543-8782 | Belo Horizonte, MG
          </p>
        </div>
      </div>
    </footer>
  );
};