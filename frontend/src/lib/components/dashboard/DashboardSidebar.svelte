
<script lang="ts">
  import {
    AudioLines,
    AudioWaveform,
    FolderOpen,
    LayoutDashboard,
    Settings,
    Sparkles,
    UserRound,
    X,
  } from '@lucide/svelte';

  import { Button, Sheet } from '#lib/components/ui';

  type Section =
    | 'overview'
    | 'studio'
    | 'voices'
    | 'projects'
    | 'settings';

  let {
    mobileOpen = $bindable(false),
    activeSection = $bindable<Section>('overview'),
  } = $props<{
    mobileOpen?: boolean;
    activeSection?: Section;
  }>();

  const navigation = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'studio',
      label: 'Speech Studio',
      icon: AudioWaveform,
    },
    {
      id: 'voices',
      label: 'Voice Library',
      icon: AudioLines,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
    },
  ] as const;

  function navigate(section: Section) {
    activeSection = section;
    mobileOpen = false;
  }
</script>

{#snippet sidebarContent(isMobile = false)}
  <div class="flex h-full flex-col bg-background">
    <!-- Brand -->
    <div class="flex h-16 items-center justify-between border-b px-5">
      <a
        href="/"
        class="flex items-center gap-2.5"
        aria-label="Vocalis home"
      >
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
        >
          <AudioWaveform class="size-5" />
        </div>

        <span class="text-lg font-semibold tracking-tight">
          Vocalis
        </span>
      </a>

      {#if isMobile}
        <Button
          variant="ghost"
          size="icon"
          onclick={() => (mobileOpen = false)}
          aria-label="Close navigation"
        >
          <X class="size-5" />
        </Button>
      {/if}
    </div>

    <!-- Navigation -->
    <div class="flex-1 space-y-7 overflow-y-auto px-3 py-6">
      <div>
        <p class="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <nav class="space-y-1" aria-label="Main navigation">
          {#each navigation as item (item.id)}
            <button
              type="button"
              onclick={() => navigate(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
              class={[
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                activeSection === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              ].join(' ')}
            >
              <item.icon class="size-[18px] shrink-0" />
              <span>{item.label}</span>

              {#if item.id === 'studio'}
                <span class="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  NEW
                </span>
              {/if}
            </button>
          {/each}
        </nav>
      </div>

      <!-- Preferences -->
      <div>
        <p class="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preferences
        </p>

        <button
          type="button"
          onclick={() => navigate('settings')}
          aria-current={activeSection === 'settings' ? 'page' : undefined}
          class={[
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            activeSection === 'settings'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          ].join(' ')}
        >
          <Settings class="size-[18px] shrink-0" />
          <span>Settings</span>
        </button>
      </div>
    </div>

    <!-- Upgrade -->
    <div class="border-t p-4">
      <div class="rounded-xl border bg-muted/40 p-4">
        <div class="mb-2 flex items-center gap-2">
          <Sparkles class="size-4 text-primary" />
          <span class="text-sm font-semibold">Upgrade your plan</span>
        </div>

        <p class="mb-3 text-xs leading-relaxed text-muted-foreground">
          Get more credits and unlock advanced voice features.
        </p>

        <Button class="w-full" size="sm">
          Explore plans
        </Button>
      </div>

      <!-- Profile -->
      <div class="mt-4 flex items-center gap-3 rounded-lg px-2 py-2">
        <div
          class="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted"
        >
          <UserRound class="size-4 text-muted-foreground" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">Your Account</p>
          <p class="truncate text-xs text-muted-foreground">
            Free Plan
          </p>
        </div>
      </div>
    </div>
  </div>
{/snippet}

<!-- Desktop sidebar -->
<aside
  class="hidden h-screen w-64 shrink-0 border-r bg-background md:flex md:flex-col"
>
  {@render sidebarContent()}
</aside>

<!-- Mobile sidebar -->
<Sheet.Root bind:open={mobileOpen}>
  <Sheet.Content
    side="left"
    class="w-[min(18rem,85vw)] p-0"
  >
    <Sheet.Title class="sr-only">Main navigation</Sheet.Title>
    <Sheet.Description class="sr-only">
      Navigate between Vocalis dashboard sections.
    </Sheet.Description>

    {@render sidebarContent(true)}
  </Sheet.Content>
</Sheet.Root>
