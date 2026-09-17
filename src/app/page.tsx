import { Navbar } from "@/components/layout/navbar";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
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
        <HowItWorks />
        <Section id="pricing" index="05" label="Pricing" containerClassName="min-h-screen">
          <Heading>Pricing</Heading>
        </Section>
      </main>
    </>
  );
}
