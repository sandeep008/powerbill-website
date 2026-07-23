import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";
import { Home } from "./pages/Home";
import { PricingPage } from "./pages/PricingPage";
import { Guide } from "./pages/Guide";
import { Support } from "./pages/Support";
import { Register } from "./pages/Register";

/** Resets scroll position on route change, unless Home is about to scroll to an anchor. */
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) window.scrollTo(0, 0);
  }, [location.pathname, location.state]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/support" element={<Support />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </HashRouter>
  );
}

export default App;
