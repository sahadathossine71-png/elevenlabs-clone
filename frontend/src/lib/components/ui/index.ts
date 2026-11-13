// Shared UI entry point. Import product-wide primitives from `#lib/components/ui`.

export { default as BrandMark } from './BrandMark.svelte';
export { default as SectionHeading } from './SectionHeading.svelte';
export { default as SurfaceCard } from './SurfaceCard.svelte';

export { Button, buttonVariants } from './button/index.js';
export type { ButtonProps, ButtonSize, ButtonVariant } from './button/index.js';

// Form components
export { default as Input } from './input/Input.svelte';
export { default as Select } from './select/Select.svelte';
export { default as Slider } from './slider/Slider.svelte';
export { default as Textarea } from './textarea/Textarea.svelte';

// Sheet component
export { default as Sheet } from './sheet/Sheet.svelte';

// Display components
export { default as Badge } from './badge/Badge.svelte';
export * as Card from './card/index.js';
