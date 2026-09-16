"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Phrases cycled in order, forever. */
  words: readonly string[];
  className?: string;
};

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1800;

/**
 * Types each phrase out, holds it, deletes it, moves to the next.
 *
 * Timing is asymmetric on purpose — deleting runs about twice as fast as
 * typing, which is what makes the rhythm read as natural rather than
 * mechanical. Scheduling is one chained timeout rather than an interval, so
 * each phase sets its own delay and nothing queues up behind a slow frame.
 *
 * The first phrase is the initial state, so it is in the server-rendered HTML
 * and the cycle begins by deleting it — no flash of empty space on load, and
 * no setState during the effect body. Under prefers-reduced-motion the loop
 * never starts and that first phrase simply stays put.
 */
export default function Typewriter({ words, className }: Props) {
  const [text, setText] = useState(words[0] ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (words.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;

    const step = () => {
      const word = words[wordIndex % words.length];

      if (deleting) {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          wordIndex += 1;
          timer.current = setTimeout(step, TYPE_MS * 3);
          return;
        }
        timer.current = setTimeout(step, DELETE_MS);
        return;
      }

      charIndex += 1;
      setText(word.slice(0, charIndex));
      if (charIndex >= word.length) {
        deleting = true;
        timer.current = setTimeout(step, HOLD_MS);
        return;
      }
      timer.current = setTimeout(step, TYPE_MS);
    };

    timer.current = setTimeout(step, HOLD_MS);
    return () => clearTimeout(timer.current);
  }, [words]);

  return (
    <span className={className}>
      {/* The churning phrase is noise for a screen reader; announce the full
          list once, off-screen, and hide the animated copy. */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="gradient-text">
        {text}
      </span>
      <span
        aria-hidden
        className="animate-caret ml-0.5 inline-block w-[2px] translate-y-0.5 bg-cyan align-middle motion-reduce:hidden"
        style={{ height: "1em" }}
      />
    </span>
  );
}
