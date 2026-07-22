import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { VideoDemo } from "./components/VideoDemo";
import { FullDemoVideo } from "./components/FullDemoVideo";
import { RestaurantDemoVideo } from "./components/RestaurantDemoVideo";
import { Features } from "./components/Features";
import { PosStyles } from "./components/PosStyles";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { Feedback } from "./components/Feedback";
import { Contact } from "./components/Contact";
import { CtaBand } from "./components/CtaBand";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <VideoDemo />
        <FullDemoVideo />
        <Features />
        <PosStyles />
        <RestaurantDemoVideo />
        <Pricing />
        <Faq />
        <Feedback />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
