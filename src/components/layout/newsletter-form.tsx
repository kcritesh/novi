"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { footer } from "@/content/content";
import { Button, Input, Text } from "@/design-system";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBMIT_DELAY_MS = 1100;

const copy = footer.newsletter;

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const messageId = `${id}-message`;
  const invalid = status === "error";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      toast.error(copy.toastError.title, { description: copy.toastError.description });
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      setEmail("");
      toast.success(copy.toastSuccess.title, { description: copy.toastSuccess.description });
    }, SUBMIT_DELAY_MS);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor={`${id}-email`} className="sr-only">
        {copy.label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder={copy.placeholder}
          value={email}
          aria-invalid={invalid || undefined}
          aria-describedby={messageId}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error" || status === "success") setStatus("idle");
          }}
        />
        <Button
          type="submit"
          variant="ink"
          aria-disabled={status === "loading"}
          className="min-w-32 shrink-0"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={status === "error" ? "idle" : status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring.snappy}
              className="inline-flex items-center gap-2"
            >
              {status === "loading" && <Loader2 aria-hidden className="animate-spin" />}
              {status === "success" && <Check aria-hidden />}
              {status === "loading" ? copy.loading : status === "success" ? copy.success : copy.submit}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
      <Text
        id={messageId}
        size="caption"
        className={cn("mt-2", invalid && "text-rose-ink")}
        aria-live="polite"
      >
        {invalid ? copy.invalid : copy.helper}
      </Text>
    </form>
  );
}
