
<script lang="ts">
	import {
		AudioLines,
		ChevronDown,
		Globe2,
		Pause,
		Play,
		Settings2,
		Sparkles,
		Volume2
	} from '@lucide/svelte';

	import { Button, Select, Slider, Textarea } from '#lib/components/ui';

	import {
		player,
		speak,
		speechSupported,
		stopSpeaking
	} from '#lib/speech.svelte';

	const maxCharacters = 5000;

	let {
		selectedVoice = $bindable('Ayesha')
	}: {
		selectedVoice?: string;
	} = $props();

	let text = $state('');
	let language = $state('bn-BD');
	let showAdvanced = $state(false);

	let rate = $state(1);
	let pitch = $state(1);

	let message = $state('');

	const voices = [
		{ name: 'Ayesha', kind: 'Natural · Female' },
		{ name: 'Rahim', kind: 'Natural · Male' },
		{ name: 'Sadia', kind: 'Expressive · Female' },
		{ name: 'Tanvir', kind: 'Conversational · Male' }
	];

	const voiceOptions = voices.map((voice) => ({
		value: voice.name,
		label: voice.name
	}));

	const languages = [
		{ value: 'bn-BD', label: 'Bangla (Bangladesh)' },
		{ value: 'en-US', label: 'English · United States' },
		{ value: 'en-GB', label: 'English · United Kingdom' },
		{ value: 'hi-IN', label: 'Hindi · India' },
		{ value: 'es-ES', label: 'Spanish · Spain' }
	];

	function play(id: string, value: string) {
		if (!value.trim()) {
			message = 'Add some text before generating speech.';
			return;
		}

		if (player.active === id) {
			stopSpeaking();
			return;
		}

		if (!speechSupported()) {
			message = 'Speech playback is not supported in this browser.';
			return;
		}

		message = '';

		speak(id, value, {
			lang: language,
			voiceName: selectedVoice,
			rate,
			pitch
		});
	}

	function handleTextInput() {
		message = '';
	}

	const characterPercentage = $derived(
		Math.min((text.length / maxCharacters) * 100, 100)
	);
</script>

<section
	class="relative min-w-0 overflow-hidden rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
	id="studio"
	aria-labelledby="studio-title"
>
	<!-- Header -->
	<div class="relative flex min-h-[155px] items-start justify-between gap-4">
		<div class="relative z-10 min-w-0">
			<p class="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground">
				<AudioLines class="size-4 text-foreground" />
				TEXT TO SPEECH
			</p>

			<h2
				id="studio-title"
				class="text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[28px]"
			>
				Convert text to
				<br class="hidden sm:block" />
				natural speech
			</h2>

			<p class="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
				Type anything, choose a voice, and listen instantly.
				Support for Bangla and 50+ languages.
			</p>
		</div>

		<!-- Decorative waveform -->
		<div
			class="pointer-events-none absolute right-0 top-0 hidden h-36 w-[48%] text-muted-foreground opacity-20 sm:block"
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 420 150"
				preserveAspectRatio="none"
				class="size-full"
			>
				<path d="M0 83C55 42 95 39 150 63S250 119 310 73 370 34 420 69" />
				<path d="M0 91C55 50 95 47 150 71S250 127 310 81 370 42 420 77" />
				<path d="M0 75C55 34 95 31 150 55S250 111 310 65 370 26 420 61" />
				<path d="M0 99C55 58 95 55 150 79S250 135 310 89 370 50 420 85" />
				<path d="M0 67C55 26 95 23 150 47S250 103 310 57 370 18 420 53" />
			</svg>
		</div>
	</div>

	<!-- Settings -->
	<div class="mb-4 flex flex-wrap items-center gap-2">
		<!-- Language -->
		<Select
			bind:value={language}
			options={languages}
			placeholder="Select language"
			aria-label="Select language"
			class="h-9 w-full rounded-full sm:w-auto sm:min-w-[205px]"
		>
			{#snippet icon()}
				<Globe2 class="size-4" />
			{/snippet}
		</Select>

		<!-- Voice -->
		<Select
			bind:value={selectedVoice}
			options={voiceOptions}
			placeholder="Select voice"
			aria-label="Select voice"
			class="h-9 w-full rounded-full sm:w-auto sm:min-w-[150px]"
		>
			{#snippet icon()}
				<Volume2 class="size-4" />
			{/snippet}
		</Select>

		<Button
			variant="outline"
			size="sm"
			class="h-9 rounded-full"
			onclick={() =>
				play(
					'studio-sample',
					'সুন্দর কথায় গড়ে উঠুক আপনার গল্প।'
				)}
		>
			{#if player.active === 'studio-sample'}
				<Pause class="mr-1 size-3.5" />
				Stop sample
			{:else}
				<Play class="mr-1 size-3.5" />
				Play Sample
			{/if}
		</Button>
	</div>

	<!-- Text editor -->
	<div class="relative">
		<Textarea
			bind:value={text}
			oninput={handleTextInput}
			maxlength={maxCharacters}
			placeholder="Type your text here..."
			rows={7}
			class="min-h-[160px] resize-y rounded-xl border bg-background px-4 pb-10 pt-4 text-sm leading-7 shadow-none placeholder:text-muted-foreground focus-visible:ring-2"
			aria-label="Text to convert into speech"
		/>

		<div class="absolute bottom-3 right-4 flex items-center gap-2">
			<span
				class={[
					'text-[11px] tabular-nums',
					text.length >= maxCharacters
						? 'font-semibold text-destructive'
						: 'text-muted-foreground'
				].join(' ')}
			>
				{text.length.toLocaleString()}
				<span class="text-muted-foreground">
					/ {maxCharacters.toLocaleString()}
				</span>
			</span>
		</div>
	</div>

	<!-- Character usage -->
	<div class="mt-2 h-1 overflow-hidden rounded-full bg-muted">
		<div
			class="h-full rounded-full bg-primary transition-[width]"
			style={`width: ${characterPercentage}%`}
		></div>
	</div>

	<!-- Advanced settings -->
	<div class="mt-4 border-t pt-3">
		<Button
			variant="ghost"
			size="sm"
			class="h-9 gap-2 px-2 text-xs text-muted-foreground"
			aria-expanded={showAdvanced}
			onclick={() => (showAdvanced = !showAdvanced)}
		>
			<Settings2 class="size-4" />
			Advanced Settings
			<ChevronDown
				class={[
					'size-4 transition-transform',
					showAdvanced ? 'rotate-180' : ''
				].join(' ')}
			/>
		</Button>

		{#if showAdvanced}
			<div class="mt-3 grid grid-cols-1 gap-6 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2">
				<!-- Speed -->
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<label
							for="speech-speed"
							class="text-sm font-medium"
						>
							Speed
						</label>

						<output
							for="speech-speed"
							class="rounded-md bg-background px-2 py-1 text-xs font-semibold tabular-nums"
						>
							{rate.toFixed(1)}×
						</output>
					</div>

					<Slider
						id="speech-speed"
						aria-label="Speech speed"
						bind:value={rate}
						min={0.6}
						max={1.5}
						step={0.1}
						class="w-full"
					/>

					<div class="flex justify-between text-[10px] text-muted-foreground">
						<span>Slow</span>
						<span>Fast</span>
					</div>
				</div>

				<!-- Pitch -->
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<label
							for="speech-pitch"
							class="text-sm font-medium"
						>
							Pitch
						</label>

						<output
							for="speech-pitch"
							class="rounded-md bg-background px-2 py-1 text-xs font-semibold tabular-nums"
						>
							{pitch.toFixed(1)}
						</output>
					</div>

					<Slider
						id="speech-pitch"
						aria-label="Speech pitch"
						bind:value={pitch}
						min={0.7}
						max={1.3}
						step={0.1}
						class="w-full"
					/>

					<div class="flex justify-between text-[10px] text-muted-foreground">
						<span>Low</span>
						<span>High</span>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Footer -->
	<div class="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
		<p class="text-xs text-muted-foreground">
			{#if text.trim()}
				{text.trim().split(/\s+/).length.toLocaleString()} words
			{:else}
				Ready to create speech
			{/if}
		</p>

		<Button
			class="h-10 w-full gap-2 rounded-full px-5 sm:w-auto"
			disabled={!text.trim() || text.length > maxCharacters}
			onclick={() => play('studio', text)}
		>
			{#if player.active === 'studio'}
				<Pause class="size-4" />
				Stop playback
			{:else}
				<Sparkles class="size-4" />
				Generate Speech
			{/if}

			<span aria-hidden="true">↗</span>
		</Button>
	</div>

	{#if message}
		<p
			class="mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive"
			role="status"
		>
			{message}
		</p>
	{/if}
</section>
