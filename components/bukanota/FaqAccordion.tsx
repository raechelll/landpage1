"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { Translate } from "@/components/SitePreferences";
import { FAQS } from "@/lib/product-content";
import styles from "./Landing.module.css";

gsap.registerPlugin(useGSAP);

export default function FaqAccordion() {
  const root = useRef<HTMLDivElement>(null);
  const active = useRef<number | null>(null);
  const { contextSafe } = useGSAP((_context, safe) => {
    if (!safe) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const settle = safe(() => {
      root.current?.querySelectorAll<HTMLDetailsElement>("details").forEach((item, index) => {
        const content = item.querySelector<HTMLElement>("[data-faq-answer]");
        const answer = content?.firstElementChild;
        gsap.killTweensOf([content, answer].filter(Boolean));
        if (content) gsap.set(content, { clearProps: "height" });
        if (answer) gsap.set(answer, { clearProps: "opacity,transform" });
        item.open = active.current === index;
      });
    });
    motion.addEventListener("change", settle);
    return () => motion.removeEventListener("change", settle);
  }, { scope: root });

  const toggle = contextSafe((index: number) => {
    const next = active.current === index ? null : index;
    active.current = next;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.current?.querySelectorAll<HTMLDetailsElement>("details").forEach((item, itemIndex) => {
      const content = item.querySelector<HTMLElement>("[data-faq-answer]");
      const answer = content?.firstElementChild as HTMLElement | null;
      const summary = item.querySelector("summary");
      if (!content || !answer || !summary) return;
      const expanding = next === itemIndex;
      summary.setAttribute("aria-expanded", String(expanding));
      if (!item.open && !expanding) return;

      const wasOpen = item.open;
      const height = wasOpen ? content.getBoundingClientRect().height : 0;
      gsap.killTweensOf([content, answer]);
      if (reduced) {
        item.open = expanding;
        gsap.set(content, { clearProps: "height" });
        gsap.set(answer, { clearProps: "opacity,transform" });
        return;
      }

      if (expanding) item.open = true;
      gsap.set(content, { height });
      if (expanding && !wasOpen) gsap.set(answer, { opacity: 0, y: 8 });
      gsap.to(content, {
        height: expanding ? "auto" : 0,
        duration: expanding ? .42 : .32,
        ease: "power2.inOut",
        onComplete: contextSafe(() => {
          item.open = expanding;
          gsap.set(content, { clearProps: "height" });
          gsap.set(answer, { clearProps: "opacity,transform" });
        }),
      });
      gsap.to(answer, { opacity: expanding ? 1 : 0, y: expanding ? 0 : -5, duration: expanding ? .3 : .22, ease: "power2.out" });
    });
  });

  return <Translate><div ref={root}>
    {FAQS.map(({ question, answer }, index) => <details className={styles.faqItem} data-scroll-reveal key={question}>
      <summary id={`faq-question-${index}`} aria-controls={`faq-answer-${index}`} onClick={(event) => { event.preventDefault(); toggle(index); }}>
        <span>{question}</span><ChevronDown size={19} aria-hidden="true" />
      </summary>
      <div className={styles.faqAnswer} id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} data-faq-answer><p>{answer}</p></div>
    </details>)}
  </div></Translate>;
}
