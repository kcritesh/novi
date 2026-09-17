import { footer } from "@/content/content";
import { Container, Logo, Text } from "@/design-system";
import { NewsletterForm } from "./newsletter-form";
import { socialGlyphs } from "./social-glyphs";

const linkClass =
  "rounded-sm text-body text-ink transition-colors duration-fast hover:text-accent-ink focus-visible:text-accent-ink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-sand">
      <Container className="relative pt-16 pb-10 sm:pt-20 lg:border-x lg:border-hairline-strong/60">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <Logo />
            <Text size="body-lg" className="mt-4">
              {footer.tagline}
            </Text>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footer.groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-label text-muted">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-hairline-strong/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Text size="label">
              © {year} {footer.legal.company}
            </Text>
            {footer.legal.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-sm text-label text-ink hover:text-accent-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ul className="flex items-center gap-2">
            {footer.socials.map((social) => {
              const Glyph = socialGlyphs[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-11 items-center justify-center rounded-full border border-hairline-strong bg-paper text-ink transition-[translate,box-shadow,color] duration-base ease-out-soft hover:-translate-y-0.5 hover:text-accent-ink hover:shadow-lift"
                  >
                    <Glyph aria-hidden className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.3em] text-center text-[clamp(8rem,28vw,24rem)] leading-none font-semibold tracking-[-0.06em] text-sand-deep select-none"
      >
        novi
      </p>
    </footer>
  );
}
