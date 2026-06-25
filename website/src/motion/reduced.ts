import type { Variants } from "motion/react";
import { reducedFade } from "./presets";

export function resolveVariants(
  reduce: boolean | null,
  variants: Variants,
): Variants | undefined {
  return reduce ? reducedFade : variants;
}
