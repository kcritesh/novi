import type { ComponentProps } from "react";

import type { ImportSourceId } from "@/content/content";

type GlyphProps = ComponentProps<"svg">;

function BoardGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" className="stroke-current" strokeWidth="1.6" />
      <rect x="6.5" y="6.5" width="4" height="10" rx="1" className="fill-current" />
      <rect x="13.5" y="6.5" width="4" height="6" rx="1" className="fill-current" />
    </svg>
  );
}

function DotsGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="7.5" r="3.5" className="fill-current" />
      <circle cx="6.5" cy="16" r="3.5" className="fill-current" />
      <circle cx="17.5" cy="16" r="3.5" className="fill-current" />
    </svg>
  );
}

function SheetGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 3h8l5 5v13H6z" className="stroke-current" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12h7M9 15.5h7M12.5 10v9" className="stroke-current" strokeWidth="1.4" />
    </svg>
  );
}

export const sourceGlyphs: Record<ImportSourceId, (props: GlyphProps) => React.JSX.Element> = {
  trello: BoardGlyph,
  asana: DotsGlyph,
  sheet: SheetGlyph,
};
