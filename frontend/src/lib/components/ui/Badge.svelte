<script lang="ts" module>
	export type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

	const badgeVariants: Record<BadgeVariant, string> = {
		default: "bg-primary text-primary-foreground",
		secondary: "bg-secondary text-secondary-foreground",
		outline: "border-border text-foreground",
		destructive: "bg-destructive/10 text-destructive"
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		variant = "default",
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<span
	bind:this={ref}
	data-slot="badge"
	class={cn(
		"inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-md border border-transparent px-2 py-0.5 text-xs font-medium [&>svg]:pointer-events-none [&>svg]:size-3",
		badgeVariants[variant],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
