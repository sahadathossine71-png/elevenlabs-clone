
<script lang="ts">
	import { ArrowRight, Bell, Menu } from '@lucide/svelte';

	import { Button, Input } from '#lib/components/ui';

	let { mobileOpen = $bindable(false) }: {
		mobileOpen?: boolean;
	} = $props();

	let query = $state('');
	let searchInput = $state<HTMLInputElement | null>(null);

	function handleShortcut(event: KeyboardEvent) {
		if (
			(event.metaKey || event.ctrlKey) &&
			event.key.toLowerCase() === 'k'
		) {
			event.preventDefault();
			searchInput?.focus();
		}
	}
</script>

<svelte:window onkeydown={handleShortcut} />

<header
	id="top"
	class="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
>
	<div
		class="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
	>
		<!-- Left: Navigation and Search -->
		<div class="flex min-w-0 flex-1 items-center gap-3">

			<Button
				variant="ghost"
				size="icon"
				class="size-9 shrink-0 md:hidden"
				aria-label="Open navigation"
				aria-expanded={mobileOpen}
				onclick={() => (mobileOpen = true)}
			>
				<Menu class="size-[19px]" />
			</Button>

			<div class="relative w-full max-w-[480px]">
				<svg
					class="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>

				<Input
					bind:ref={searchInput}
					bind:value={query}
					id="dashboard-global-search"
					type="search"
					placeholder="Search voices, projects..."
					aria-label="Search voices or projects"
					class="h-9 rounded-full border-transparent bg-muted pl-9 pr-14 text-xs shadow-none focus-visible:bg-background"
				/>

				<kbd
					class="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-flex"
				>
					⌘ K
				</kbd>
			</div>
		</div>

		<!-- Right: Actions -->
		<div class="flex shrink-0 items-center gap-2 sm:gap-3">

			<Button
				variant="ghost"
				size="icon"
				class="relative size-9 text-muted-foreground"
				aria-label="Notifications"
			>
				<Bell class="size-[18px]" />

				<span
					class="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-background"
					aria-hidden="true"
				></span>
			</Button>

			<Button
				href="#studio"
				class="h-9 gap-2 rounded-full px-3 text-xs sm:px-4"
			>
				<span class="hidden sm:inline">
					Generate Speech
				</span>

				<ArrowRight class="size-[15px]" />
			</Button>
		</div>
	</div>
</header>
