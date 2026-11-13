<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn } from "#lib/utils.js";

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, "type" | "value" | "min" | "max" | "step"> & {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
	} = $props();
</script>

<input
	data-slot="slider"
	type="range"
	class={cn(
		"h-5 w-full cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{min}
	{max}
	{step}
	bind:value
	{...restProps}
/>
