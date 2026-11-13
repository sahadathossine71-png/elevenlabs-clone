<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "#lib/utils.js";

	let {
		open = $bindable(false),
		side = "left",
		label = "Menu",
		class: className,
		children
	}: {
		open?: boolean;
		side?: "left" | "right";
		label?: string;
		class?: string;
		children?: Snippet;
	} = $props();

	let panel = $state<HTMLDivElement | null>(null);

	function close() {
		open = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (open && event.key === "Escape") close();
	}

	// Lock page scroll and move focus into the panel while it is open.
	$effect(() => {
		if (!open) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		panel?.focus();

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div data-slot="sheet" class="fixed inset-0 z-50">
		<button
			type="button"
			class="absolute inset-0 h-full w-full cursor-default bg-black/50"
			aria-label="Close"
			tabindex="-1"
			onclick={close}
		></button>

		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-label={label}
			tabindex="-1"
			class={cn(
				"absolute inset-y-0 flex flex-col bg-background shadow-xl outline-none",
				side === "left" ? "left-0 border-r" : "right-0 border-l",
				className
			)}
		>
			{@render children?.()}
		</div>
	</div>
{/if}
