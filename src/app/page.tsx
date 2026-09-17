import { Navbar } from "@/components/layout/navbar";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { ProofGrid } from "@/components/sections/proof-grid";
import { Heading, Section } from "@/design-system";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ProofGrid />
        <Features />
        <Section id="how-it-works" index="04" label="How it works" containerClassName="min-h-screen">
          <Heading>How it works</Heading>
        </Section>
        <Section id="pricing" index="05" label="Pricing" containerClassName="min-h-screen">
          <Heading>Pricing</Heading>
        </Section>
      </main>
    </>
  );
}
