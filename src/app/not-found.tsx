import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SkyImage } from "@/components/layout/sky-image";
import { notFound } from "@/content/content";
import { Button, Container, Em, Heading, Logo, Pill, Text } from "@/design-system";

export const metadata: Metadata = {
  title: "Page not found · Novi",
};

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hero-fade">
        <SkyImage />
        <div className="absolute inset-0 hero-veil" />
      </div>

      <Container className="flex h-16 items-center">
        <Link href="/" aria-label="Novi home" className="-ml-1 rounded-control p-1">
          <Logo />
        </Link>
      </Container>

      <Container className="flex flex-1 flex-col items-center justify-center pb-24 text-center">
        <div className="animate-rise-in">
          <Pill tone="outline" size="md">
            Error {notFound.code}
          </Pill>
        </div>

        <div className="animate-settle-in">
          <Heading as="h1" size="display-xl" className="mx-auto mt-6 max-w-4xl text-pretty">
            {notFound.headline.lead} <Em>{notFound.headline.emphasis}</Em>
          </Heading>
        </div>

        <div className="animate-rise-in [animation-delay:160ms]">
          <Text size="body-lg" className="mx-auto mt-6 max-w-xl text-balance">
            {notFound.support}
          </Text>
        </div>

        <div className="mt-8 flex w-full animate-rise-in flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="group w-full sm:w-auto">
            <Link href={notFound.primaryCta.href}>
              <ArrowLeft
                aria-hidden
                className="transition-transform duration-fast group-hover:-translate-x-0.5"
              />
              {notFound.primaryCta.label}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group w-full sm:w-auto">
            <Link href={notFound.secondaryCta.href}>
              {notFound.secondaryCta.label}
              <ArrowRight
                aria-hidden
                className="transition-transform duration-fast group-hover:translate-x-0.5"
              />
            </Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
