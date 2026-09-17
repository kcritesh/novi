import { Em, Heading, Section, Text } from "@/design-system";
import { hero } from "@/content/content";

export default function Home() {
  return (
    <main id="main">
      <Section id="overview" index="01" label="Overview" className="border-t-0">
        <Heading as="h1" size="display-xl" className="text-center">
          {hero.headline.lead} <Em>{hero.headline.emphasis}</Em>
        </Heading>
        <Text size="body-lg" className="mx-auto mt-6 max-w-prose text-center">
          {hero.support}
        </Text>
      </Section>
    </main>
  );
}
