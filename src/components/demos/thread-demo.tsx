"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ThumbsUp } from "lucide-react";

import { features } from "@/content/content";
import { Avatar, Pill } from "@/design-system";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { task, messages, reactions } = features.threads;

type ThreadState = { shown: number; typing: boolean; chars: number; reacted: boolean };

const preloaded = 2;
const initialState: ThreadState = {
  shown: preloaded,
  typing: false,
  chars: messages[preloaded - 1].text.length,
  reacted: false,
};
const finalState: ThreadState = {
  shown: messages.length,
  typing: false,
  chars: messages[messages.length - 1].text.length,
  reacted: true,
};

export function ThreadDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = usePrefersReducedMotion();
  const [state, setState] = useState<ThreadState>(initialState);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));

    async function play() {
      for (let index = preloaded; index < messages.length; index++) {
        setState((s) => ({ ...s, typing: true }));
        await wait(index === preloaded ? 600 : 900);
        if (cancelled) return;
        setState((s) => ({ ...s, typing: false, shown: index + 1, chars: 0 }));
        for (let char = 1; char <= messages[index].text.length; char++) {
          await wait(16);
          if (cancelled) return;
          setState((s) => ({ ...s, chars: char }));
        }
      }
      await wait(450);
      if (!cancelled) setState((s) => ({ ...s, reacted: true }));
    }

    play();
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [inView, reduceMotion]);

  const view = reduceMotion ? finalState : state;

  return (
    <div ref={ref} className="relative">
      <div className="rounded-card border border-hairline bg-surface p-3 shadow-card" aria-hidden>
        <div className="flex items-center justify-between gap-2 border-b border-hairline pb-2.5">
          <span className="truncate text-caption font-medium text-ink sm:text-label">{task.title}</span>
          <Pill tone={task.tag.tone}>{task.tag.label}</Pill>
        </div>

        <ul className="mt-3 flex min-h-52 flex-col gap-2 sm:min-h-56 sm:gap-2.5">
          <AnimatePresence initial={false}>
            {messages.slice(0, view.shown).map((message, index) => {
              const isLatest = index === view.shown - 1;
              const text = isLatest ? message.text.slice(0, view.chars) : message.text;
              return (
                <motion.li
                  key={message.author.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring.soft}
                  className="flex items-start gap-2"
                >
                  <Avatar name={message.author.name} src={message.author.photo} tone={message.author.tone} />
                  <div
                    className={cn(
                      "relative min-w-0 rounded-card rounded-tl-sm bg-paper px-2.5 py-1.5",
                      index === messages.length - 1 && "pb-3.5",
                    )}
                  >
                    <p className="text-micro font-medium text-muted">{message.author.name}</p>
                    <p className="text-micro text-ink sm:text-caption">{text}</p>
                    {index === messages.length - 1 && (
                      <AnimatePresence>
                        {view.reacted && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={spring.bouncy}
                            className="absolute -right-2 -bottom-3 inline-flex h-6 items-center gap-1 rounded-full border border-hairline bg-surface px-2 text-micro font-medium text-ink shadow-card"
                          >
                            <ThumbsUp className="size-3 text-accent" />
                            {reactions}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </motion.li>
              );
            })}
            {view.typing && (
              <motion.li
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Avatar
                  name={messages[view.shown]?.author.name ?? "Teammate"}
                  src={messages[view.shown]?.author.photo}
                  tone={messages[view.shown]?.author.tone}
                />
                <span className="inline-flex h-7 items-center gap-1 rounded-full bg-paper px-3">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="size-1.5 rounded-full bg-subtle"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.12 }}
                    />
                  ))}
                </span>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>

      <p className="sr-only">
        A task card with a comment thread: {messages.map((m) => `${m.author.name}: ${m.text}`).join(" ")}
      </p>
    </div>
  );
}
