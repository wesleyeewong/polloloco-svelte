<script lang="ts">
  import { AppShell, Drawer } from "@skeletonlabs/skeleton"
  import type { DrawerSettings } from "@skeletonlabs/skeleton";
  import { drawerStore } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import DrawerAnchor from "$lib/DrawerAnchor.svelte";
  
  const drawerSettings: DrawerSettings = {
    id: 'example-3',
    bgDrawer: 'bg-gradient-to-tr from-secondary-800 via-secondary-700 to-tertiary-700',
    width: 'w-[250px] md:w-[300px]',
    padding: 'p-10',
    rounded: 'rounded-xl',
  };

  function openDrawer() {
    drawerStore.open(drawerSettings);
  }
</script>

<Drawer>
  <div class="grid grid-flow-row">
    <DrawerAnchor selected={ $page.url.pathname === "/app/day" } label="Day" href="/app/day" />
    <DrawerAnchor selected={ $page.url.pathname === "/app/plan" } label="Plan" href="/app/plan" />
  </div>
</Drawer>

<button type="button" class="z-50 btn-icon btn-icon-lg variant-filled-primary fixed bottom-4 right-7 md:top-7" on:click={ openDrawer }>
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M105 841v-91h750v91H105Zm0-219v-91h750v91H105Zm0-220v-92h750v92H105Z"/></svg>
</button>

<AppShell>
  <slot />
</AppShell>
