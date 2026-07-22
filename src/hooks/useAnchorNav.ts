import { useLocation, useNavigate } from "react-router-dom";

/**
 * Scrolls to a section id on Home. If not currently on Home, navigates there
 * first and passes the target id via router state -- Home.tsx picks it up
 * and scrolls after mount. Needed because HashRouter treats the whole hash
 * as the route path, so a plain `href="#features"` would be read as a route
 * change to "/features" instead of an in-page scroll.
 */
export function useAnchorNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (anchor: string) => {
    if (location.pathname === "/") {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: anchor } });
    }
  };
}
