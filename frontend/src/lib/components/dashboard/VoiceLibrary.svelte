
<script lang="ts">
	import {
		Check,
		Headphones,
		Pause,
		Play,
		AudioWaveform,
		Volume2
	} from '@lucide/svelte';

	import {
		Button,
		Badge,
		Card,
		SectionHeading
	} from '#lib/components/ui';

	import { dashboardVoices } from '#lib/data/dashboard';
	import { player, toggleSpeech } from '#lib/speech.svelte';

	let {
		selectedVoice = $bindable('Ayesha')
	}: {
		selectedVoice?: string;
	} = $props();

	const avatarStyles: Record<string, string> = {
		rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
		green: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
		blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
		gold: 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
	};

	function selectVoice(name: string) {
		selectedVoice = name;
	}

	function playVoice(voice: (typeof dashboardVoices)[number]) {
		toggleSpeech(`voice-${voice.name}`, voice.sample, {
			lang: 'bn-BD'
		});
	}
</script>

<section
	class="min-w-0 space-y-4"
	id="voices"
	aria-labelledby="voices-title"
>
	<!-- Section heading -->
	<SectionHeading
		id="voices-title"
		title="Your Voices"
		href="#studio"
	/>

	<!-- Voice library -->
	<div class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
		{#each dashboardVoices as voice (voice.name)}
			{@const isSelected = selectedVoice === voice.name}
			{@const isPlaying = player.active === `voice-${voice.name}`}

			<Card.Root
				class={[
					'min-w-0 overflow-hidden rounded-xl bg-card shadow-none transition-colors',
					isSelected
						? 'border-primary/50 ring-1 ring-primary/20'
						: 'border-border hover:border-muted-foreground/40'
				].join(' ')}
			>
				<Card.Content class="p-4">
					<div class="flex min-w-0 items-center gap-3">
						<!-- Voice avatar -->
						<div
							class={[
								'flex size-11 shrink-0 items-center justify-center rounded-xl',
								avatarStyles[voice.tone] ??
									'bg-muted text-muted-foreground'
							].join(' ')}
						>
							<AudioWaveform class="size-5" strokeWidth={1.7} />
						</div>

						<!-- Voice information -->
						<div class="min-w-0 flex-1">
							<div class="flex min-w-0 items-center gap-2">
								<h3 class="truncate text-sm font-semibold tracking-tight text-foreground">
									{voice.name}
								</h3>

								{#if isSelected}
									<Badge
										variant="secondary"
										class="h-5 shrink-0 gap-1 rounded-md px-1.5 text-[10px] font-medium"
									>
										<Check class="size-3" />
										Selected
									</Badge>
								{/if}
							</div>

							<p class="mt-1 truncate text-xs text-muted-foreground">
								{voice.style}
								<span class="px-0.5">·</span>
								{voice.detail}
							</p>
						</div>

						<!-- Preview -->
						<Button
							variant="outline"
							size="icon"
							class="size-9 shrink-0 rounded-full"
							aria-label={`${isPlaying ? 'Stop' : 'Play'} ${voice.name} voice sample`}
							aria-pressed={isPlaying}
							onclick={() => playVoice(voice)}
						>
							{#if isPlaying}
								<Pause class="size-4" />
							{:else}
								<Play class="size-4" />
							{/if}
						</Button>
					</div>

					<!-- Card footer -->
					<div class="mt-4 flex items-center justify-between gap-2 border-t pt-3">
						<div class="flex items-center gap-1.5 text-[11px] text-muted-foreground">
							<Volume2 class="size-3.5" />
							<span>Voice preview</span>
						</div>

						<Button
							variant={isSelected ? 'secondary' : 'outline'}
							size="sm"
							class="h-8 min-w-[90px] rounded-full px-3 text-xs"
							disabled={isSelected}
							onclick={() => selectVoice(voice.name)}
						>
							{#if isSelected}
								<Check class="mr-1 size-3.5" />
								Selected
							{:else}
								Select voice
							{/if}
						</Button>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>

	<!-- Library footer -->
	<div class="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
		<p class="flex items-center gap-2 text-xs text-muted-foreground">
			<Headphones class="size-4" />
			{dashboardVoices.length} available voices
		</p>

		<a
			href="#studio"
			class="text-xs font-medium text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
		>
			Use selected voice →
		</a>
	</div>
</section>
