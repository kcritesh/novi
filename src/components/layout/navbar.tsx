"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { nav } from "@/content/content";
import { Button, Container, Logo } from "@/design-system";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

const sectionIds = nav.links.map((link) => link.href.slice(1));

export function Navbar() {
  const scrolled = useScrolled(20);
  const active = useActiveSection(sectionIds);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const highlighted = hovered ?? active;

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "sticky top-0 z-50 border-b border-transparent",
        "transition-[background-color,border-color,backdrop-filter] duration-base ease-out-soft",
        "data-[scrolled=true]:border-hairline data-[scrolled=true]:bg-paper/80 data-[scrolled=true]:backdrop-blur-lg",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#overview" aria-label="Novi home" className="-ml-1 rounded-control p-1">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
            {nav.links.map((link) => {
              const id = link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active === id ? "location" : undefined}
                    onMouseEnter={() => setHovered(id)}
                    onFocus={() => setHovered(id)}
                    onBlur={() => setHovered(null)}
                    className="relative inline-flex h-11 items-center rounded-control px-4 text-label font-medium text-ink-soft transition-colors duration-fast hover:text-ink aria-[current=location]:text-ink"
                  >
                    {highlighted === id && (
                      <motion.span
                        layoutId="nav-highlight"
                        transition={spring.snappy}
                        className="absolute inset-x-0 inset-y-1.5 rounded-control bg-sand"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ink" size="sm" className="hidden sm:inline-flex">
            <a href={nav.cta.href}>{nav.cta.label}</a>
          </Button>
          <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </Container>
    </header>
  );
}
