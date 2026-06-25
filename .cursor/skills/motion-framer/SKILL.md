---
name: motion-framer
description: >-
  Motion (Framer Motion) animations for React with überagent motion personality.
  Use when adding animations, scroll reveals, modals, gestures, or micro-interactions
  on the website. Follows calm, precise, premium motion – no bouncy SaaS effects.
---

# Motion & überagent Personality

## Before coding

1. Read `design/design.md` for motion personality
2. Use presets from `website/src/motion/` – never invent inline durations
3. Import: `import { motion, AnimatePresence, useReducedMotion } from "motion/react"`

## Motion Personality

The motion style is:

- calm
- elegant
- precise
- premium
- technical
- restrained
- system-like
- fast but not nervous
- cinematic only in hero/scroll sections

### Avoid

- bouncy toy-like motion
- excessive parallax
- random particle chaos
- scroll-jacking
- long delays
- overanimated SaaS sections
- animations on every element

## Quick patterns

### Scroll reveal

```tsx
import { motion } from "motion/react";
import { fadeUp, staggerContainer, fadeUpItem, viewport } from "../../motion";

<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
```

### Staggered list

```tsx
<motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}>
  {items.map((item) => (
    <motion.li key={item.id} variants={fadeUpItem}>{item}</motion.li>
  ))}
</motion.ul>
```

### Modal with exit

```tsx
<AnimatePresence>
  {isOpen && (
  <>
    <motion.div key="overlay" variants={modalOverlay} initial="hidden" animate="visible" exit="exit" />
    <motion.div key="dialog" variants={modalDialog} initial="hidden" animate="visible" exit="exit" />
  </>
  )}
</AnimatePresence>
```

### Reduced motion

```tsx
const reduce = useReducedMotion();
if (reduce) return <Tag className={className}>{children}</Tag>;
```

## Tokens

| Token | Value |
|-------|-------|
| fast | 0.2s |
| normal | 0.4s |
| slow | 0.55s |
| hero | 0.75s |
| spring | stiffness 420, damping 38 |
| stagger | 60ms |

## Checklist

- [ ] Preset from `motion/presets.ts`
- [ ] `useReducedMotion()` for entrances
- [ ] GPU props only (opacity, transform)
- [ ] `AnimatePresence` + unique `key` for exits
- [ ] No bounce, no parallax outside hero

## Reference

Full Motion API: [motion.dev](https://motion.dev/)
