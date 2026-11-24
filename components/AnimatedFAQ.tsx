"use client";

import { useEffect, useRef, type MouseEvent } from "react";

type Question = {
  question: string;
  answer: string;
};

function FAQItem({
  question,
  answer,
  initiallyOpen,
}: Question & { initiallyOpen: boolean }) {
  const details = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const intendedOpen = useRef(initiallyOpen);
  const reducedMotion = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    const element = details.current;
    if (!element) return;

    // Keep any native interaction that happened before hydration.
    intendedOpen.current = element.open;
    element.dataset.expanded = String(element.open);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media;

    const settle = () => {
      if (!media.matches) return;
      animation.current?.cancel();
      animation.current = null;
      element.open = intendedOpen.current;
    };
    media.addEventListener("change", settle);

    return () => {
      animation.current?.cancel();
      animation.current = null;
      reducedMotion.current = null;
      media.removeEventListener("change", settle);
    };
  }, []);

  function toggle(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const element = details.current;
    const answer = content.current;
    if (!element || !answer) return;

    const nextOpen = !intendedOpen.current;
    intendedOpen.current = nextOpen;
    const fromHeight = element.open ? answer.getBoundingClientRect().height : 0;
    const fromOpacity = element.open
      ? Number.parseFloat(window.getComputedStyle(answer).opacity)
      : 0;

    animation.current?.cancel();
    animation.current = null;
    element.dataset.expanded = String(nextOpen);

    if (reducedMotion.current?.matches || !answer.animate) {
      element.open = nextOpen;
      return;
    }

    // Keep details open while collapsing so the browser can paint the answer.
    element.open = true;
    const next = answer.animate(
      [
        { height: `${fromHeight}px`, opacity: fromOpacity },
        {
          height: `${nextOpen ? answer.scrollHeight : 0}px`,
          opacity: nextOpen ? 1 : 0,
        },
      ],
      {
        duration: nextOpen ? 340 : 280,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      },
    );
    animation.current = next;
    next.onfinish = () => {
      if (animation.current !== next) return;
      element.open = nextOpen;
      animation.current = null;
      next.cancel();
    };
  }

  return (
    <details
      className="closing-question"
      ref={details}
      open={initiallyOpen}
      data-expanded={initiallyOpen}
    >
      <summary onClick={toggle}>
        <span>{question}</span>
        <span className="closing-question-icon" aria-hidden="true" />
      </summary>
      <div className="closing-answer" ref={content}>
        <p>{answer}</p>
      </div>
    </details>
  );
}

export default function AnimatedFAQ({
  questions,
}: {
  questions: readonly Question[];
}) {
  return (
    <div className="closing-questions">
      {questions.map((item, index) => (
        <FAQItem key={item.question} {...item} initiallyOpen={index === 0} />
      ))}
    </div>
  );
}
