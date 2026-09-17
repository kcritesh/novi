"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "motion/react";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav } from "@/content/content";
import { Button, Container, Logo, Text } from "@/design-system";
import { useMediaQuery } from "@/hooks/use-media-query";
import { menuItem, stagger } from "@/lib/motion";
import { scrollToHash } from "@/lib/scroll";
import { MenuToggle } from "./menu-toggle";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const pendingHash = useRef<string | null>(null);

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    pendingHash.current = event.currentTarget.hash;
    onOpenChange(false);
  }

  return (
    <Sheet open={open && !isDesktop} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <MenuToggle open={open} className="-mr-2.5 lg:hidden" />
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        onCloseAutoFocus={(event) => {
          // Radix would return focus to the trigger; after a link tap, focus the target section instead.
          const hash = pendingHash.current;
          if (!hash) return;
          event.preventDefault();
          pendingHash.current = null;
          scrollToHash(hash);
        }}
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <Container className="flex h-16 shrink-0 items-center justify-between border-b border-hairline">
          <a href="#overview" onClick={navigate} aria-label="Novi home" className="rounded-control">
            <Logo />
          </a>
          <SheetClose asChild>
            <MenuToggle open animateOnMount className="-mr-2.5" />
          </SheetClose>
        </Container>

        <Container className="flex flex-1 flex-col justify-between overflow-y-auto pt-4 pb-8">
          <nav aria-label="Mobile">
            <motion.ul initial="hidden" animate="visible" variants={stagger(0.06, 0.08)}>
              {nav.links.map((link, index) => (
                <motion.li key={link.href} variants={menuItem} className="border-b border-hairline">
                  <a
                    href={link.href}
                    onClick={navigate}
                    className="flex items-baseline gap-4 py-5 text-display-sm font-semibold text-ink"
                  >
                    <span className="font-mono text-caption font-normal text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <motion.div initial="hidden" animate="visible" variants={menuItem} className="mt-10">
            <Button asChild block size="lg">
              <a href={nav.cta.href} onClick={navigate}>
                {nav.cta.label}
              </a>
            </Button>
            <Text size="caption" className="mt-3 text-center">
              {nav.ctaNote}
            </Text>
          </motion.div>
        </Container>
      </SheetContent>
    </Sheet>
  );
}
