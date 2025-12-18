import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">NR1 Consultoria</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre NR1
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("beneficios")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </button>
            <Link to="/downloads">
              <Button variant="outline" size="sm">
                Materiais
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </Link>
            )}
            {user ? (
              <Button size="sm" variant="ghost" onClick={signOut}>
                Sair
              </Button>
            ) : (
              <Link to="/auth">
                <Button size="sm">Entrar</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Sobre NR1
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("beneficios")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Contato
              </button>
              <Link to="/downloads" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Materiais
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-1" />
                    Admin
                  </Button>
                </Link>
              )}
              {user ? (
                <Button className="w-full" variant="ghost" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                  Sair
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Entrar</Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
