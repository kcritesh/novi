"use client";

import type { ComponentProps } from "react";
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  closeLabel?: string;
};

export function DialogContent({ className, children, closeLabel = "Close", ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-scrim backdrop-blur-[2px] data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-130 -translate-x-1/2 -translate-y-1/2",
          "rounded-panel border border-hairline bg-surface p-6 shadow-modal outline-none sm:p-8",
          "data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label={closeLabel}
          className="absolute top-3 right-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-control text-muted transition-colors duration-fast hover:bg-sand hover:text-ink"
        >
          <XIcon className="size-5" aria-hidden />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title className={cn("pr-10 text-title font-semibold text-ink", className)} {...props} />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn("mt-1.5 text-body text-muted", className)} {...props} />;
}
