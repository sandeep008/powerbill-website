import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Features } from "./components/Features";
import { PosStyles } from "./components/PosStyles";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { CtaBand } from "./components/CtaBand";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <PosStyles />
        <Pricing />
        <Faq />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}

export default App;
