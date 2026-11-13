<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLSelectAttributes } from "svelte/elements";
	import { ChevronDown } from "@lucide/svelte";
	import { cn } from "#lib/utils.js";

	type SelectOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	let {
		ref = $bindable(null),
		value = $bindable(""),
		options,
		placeholder,
		icon,
		class: className,
		...restProps
	}: Omit<HTMLSelectAttributes, "value" | "children"> & {
		ref?: HTMLSelectElement | null;
		value?: string;
		options: SelectOption[];
		placeholder?: string;
		icon?: Snippet;
	} = $props();
</script>

<div data-slot="select" class={cn("relative inline-flex items-center", className)}>
	{#if icon}
		<span
			class="pointer-events-none absolute left-3 z-10 flex items-center text-muted-foreground"
			aria-hidden="true"
		>
			{@render icon()}
		</span>
	{/if}

	<select
		bind:this={ref}
		bind:value
		class={cn(
			"h-full min-h-9 w-full cursor-pointer appearance-none rounded-[inherit] border border-input bg-background pr-9 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
			icon ? "pl-9" : "pl-3"
		)}
		{...restProps}
	>
		{#if placeholder}
			<option value="" disabled hidden>{placeholder}</option>
		{/if}

		{#each options as option (option.value)}
			<option value={option.value} disabled={option.disabled}>
				{option.label}
			</option>
		{/each}
	</select>

	<ChevronDown
		class="pointer-events-none absolute right-3 size-4 text-muted-foreground"
		aria-hidden="true"
	/>
</div>
