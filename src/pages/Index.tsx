import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { AboutNR1 } from "@/components/landing/AboutNR1";
import { Services } from "@/components/landing/Services";
import { Benefits } from "@/components/landing/Benefits";
import { ContactForm } from "@/components/landing/ContactForm";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutNR1 />
        <Services />
        <Benefits />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;