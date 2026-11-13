<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		class: className,
		...restProps
	}: WithElementRef<HTMLInputAttributes, HTMLInputElement> = $props();
</script>

<input
	bind:this={ref}
	data-slot="input"
	class={cn(
		"h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
		className
	)}
	{type}
	bind:value
	{...restProps}
/>
