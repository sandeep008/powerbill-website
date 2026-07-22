import { Contact } from "../components/Contact";
import { Faq } from "../components/Faq";
import { Feedback } from "../components/Feedback";
import { Reveal } from "../components/Reveal";

export function Support() {
  return (
    <>
      <Reveal>
        <Contact />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <Reveal>
        <Feedback />
      </Reveal>
    </>
  );
}
