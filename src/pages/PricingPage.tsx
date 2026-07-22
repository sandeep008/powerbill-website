import { Pricing } from "../components/Pricing";
import { PricingComparison } from "../components/PricingComparison";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../components/Reveal";

export function PricingPage() {
  return (
    <>
      <Pricing />
      <Reveal className="px-6 pb-24">
        <PricingComparison />
      </Reveal>
      <CtaBand />
    </>
  );
}
