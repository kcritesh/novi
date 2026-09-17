import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-xl",
        "display-lg",
        "display-md",
        "display-sm",
        "title",
        "body-lg",
        "body",
        "label",
        "caption",
        "micro",
      ],
      radius: ["control", "card", "panel"],
      shadow: ["hairline", "card", "lift", "window", "modal"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
