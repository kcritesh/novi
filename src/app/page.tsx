import { Navbar } from "@/components/layout/navbar";
import { hero } from "@/content/content";
import { Em, Heading, Section, Text } from "@/design-system";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Section id="overview" index="01" label="Overview" className="border-t-0">
          <Heading as="h1" size="display-xl" className="text-center">
            {hero.headline.lead} <Em>{hero.headline.emphasis}</Em>
          </Heading>
          <Text size="body-lg" className="mx-auto mt-6 max-w-prose text-center">
            {hero.support}
          </Text>
        </Section>
        <Section id="features" index="03" label="Features" containerClassName="min-h-screen">
          <Heading>Features</Heading>
        </Section>
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
