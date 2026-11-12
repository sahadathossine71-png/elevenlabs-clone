
<script lang="ts">
	import {
		Activity,
		BarChart3,
		Crown,
		Pause,
		Play
	} from '@lucide/svelte';

	import { Button, SurfaceCard } from '#lib/components/ui';
	import { player, toggleSpeech } from '#lib/speech.svelte';
	import { dashboardActivities } from '#lib/data/dashboard';
</script>

<aside
	class="grid min-w-0 content-start grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-1"
	aria-label="Account overview"
>
	<!-- Usage -->
	<SurfaceCard
		class="min-w-0 rounded-xl border bg-card p-5 shadow-none"
		id="usage"
		aria-labelledby="usage-title"
	>
		<div class="flex items-center justify-between gap-2">
			<h2
				id="usage-title"
				class="flex items-center gap-2 text-xs font-bold text-foreground"
			>
				<BarChart3 class="size-4 text-muted-foreground" />
				Usage
			</h2>

			<a
				href="#usage"
				class="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
			>
				View Usage
				<span aria-hidden="true">→</span>
			</a>
		</div>

		<div class="mt-6">
			<p class="text-3xl font-bold leading-none tracking-tight text-foreground">
				2,500
			</p>

			<p class="mt-2 text-xs text-muted-foreground">
				characters remaining this month
			</p>
		</div>

		<div
			class="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"
			role="progressbar"
			aria-label="Monthly character usage"
			aria-valuenow="70"
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div class="h-full w-[70%] rounded-full bg-primary"></div>
		</div>

		<div class="mt-4 flex items-center justify-between gap-2">
			<span class="flex items-center gap-1.5 text-xs font-semibold text-foreground">
				<Crown class="size-4 text-amber-500" />
				Pro Plan
			</span>

			<span class="rounded-full border border-emerald-600/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
				Active
			</span>
		</div>
	</SurfaceCard>

	<!-- Recent Activity -->
	<SurfaceCard
		class="min-w-0 rounded-xl border bg-card px-5 pb-2 pt-5 shadow-none"
		id="activity"
		aria-labelledby="activity-title"
	>
		<div class="flex items-center justify-between gap-2">
			<h2
				id="activity-title"
				class="flex items-center gap-2 text-xs font-bold text-foreground"
			>
				<Activity class="size-4 text-muted-foreground" />
				Recent Activity
			</h2>

			<a
				href="#activity"
				class="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
			>
				View all
				<span aria-hidden="true">→</span>
			</a>
		</div>

		<div class="mt-3 grid">
			{#each dashboardActivities as activity, index (`activity-${index}`)}
				<div class="flex min-w-0 items-center gap-3 border-t py-3 first:border-t-0">
					<Button
						variant="secondary"
						size="icon"
						class="size-8 shrink-0 rounded-full"
						aria-label={`${player.active === `activity-${index}` ? 'Stop' : 'Play'} ${activity.title}`}
						aria-pressed={player.active === `activity-${index}`}
						onclick={() =>
							toggleSpeech(`activity-${index}`, activity.text, {
								lang: activity.lang
							})}
					>
						{#if player.active === `activity-${index}`}
							<Pause class="size-3.5" />
						{:else}
							<Play class="size-3.5" />
						{/if}
					</Button>

					<div class="grid min-w-0 flex-1 gap-1">
						<strong class="truncate text-xs font-semibold text-foreground">
							{activity.title}
						</strong>

						<span class="text-[11px] text-muted-foreground">
							{activity.age}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</SurfaceCard>

	<!-- Upgrade -->
	<section
		class="relative col-span-1 min-w-0 overflow-hidden rounded-xl bg-[#0d0f12] p-5 text-white md:col-span-2 lg:col-span-1"
		aria-labelledby="upgrade-title"
	>
		<div
			class="pointer-events-none absolute -bottom-6 -right-6 size-36 rotate-[-15deg] text-slate-400 opacity-30"
			aria-hidden="true"
		>
			<svg viewBox="0 0 200 200" fill="none" class="size-full">
				<path d="M0 100C40 160 80 40 120 100S200 40 240 100" />
				<path d="M0 120C40 180 80 60 120 120S200 60 240 120" />
				<path d="M0 80C40 140 80 20 120 80S200 20 240 80" />
			</svg>
		</div>

		<div class="relative z-10">
			<h2
				id="upgrade-title"
				class="text-lg font-semibold leading-tight tracking-tight"
			>
				Unlock the full power<br />
				of Vocalis
			</h2>

			<p class="mt-2 max-w-[225px] text-xs leading-relaxed text-slate-400">
				Get more credits, access premium voices and advanced features.
			</p>

			<Button
				href="#usage"
				variant="outline"
				size="sm"
				class="mt-3 rounded-full border-transparent bg-white text-xs text-slate-950 hover:bg-slate-200 hover:text-slate-950"
			>
				Upgrade to Pro
				<span aria-hidden="true">→</span>
			</Button>
		</div>
	</section>
</aside>
