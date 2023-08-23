<script lang="ts">
  import { goto } from "$app/navigation";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
  import { refreshAccessToken } from "$lib/authentications";

  async function handleClick() {
    if (await refreshAccessToken()) {
      goto("/app");
    } else{
      goto("/signin");
    }
  }
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
      <svelte:fragment slot="lead">Icon</svelte:fragment>
      <h1>Polloloco</h1>
      <svelte:fragment slot="trail">
        <button type="button" class="btn variant-filled-surface" on:click={ handleClick }>Let's Go!</button>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />

  <svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
