import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CtaBand } from "@/components/sections/cta-band";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { ProofGrid } from "@/components/sections/proof-grid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ProofGrid />
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
