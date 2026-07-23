import type { ReactNode } from "react";

/**
 * Floating 3D screenshot effect: tilted in perspective by default, straightens
 * to flat on hover/focus. Pure CSS (see .tilt-3d rules in index.css) so it
 * costs nothing in JS and honors prefers-reduced-motion automatically.
 */
export function Tilt3D({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`tilt-3d-wrap ${className}`}>
      <div className="tilt-3d">{children}</div>
    </div>
  );
}
