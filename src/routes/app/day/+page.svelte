<script lang="ts">
  import { Modal, modalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import CompletedSetModal from "$lib/CompletedSetModal.svelte";
  import { authorizedGet } from "$lib/api_requests";
	import { goto } from "$app/navigation";

  const modalComponent: ModalComponent = {
    ref: CompletedSetModal
  };

  function triggerModal(pa_id: number, reps: number, weight: number) {
    let modal: ModalSettings = {
      type: "component",
      component: modalComponent,
      title: "Complete Set",
      body: "Make changes as needed",
      meta: { pa_id: pa_id, reps: reps, weight: weight }
    }
    modalStore.trigger(modal);
  }

  const getDay = async () => {
    const res = await authorizedGet("/current_day");
    if (res.status == 200) {
      let data = await res.json();
      return data as DayData;
    }
    return null;
  }
</script>

<h1 class="p-4">Day</h1>
<Modal />

<div class="card variant-soft-surface p-4 m-5 h-auto">
  {#await getDay()}
    <p>Loading day...</p>
  {:then data}
    {#if data != null}
      {#each data.progression_assignments as pa}
        <div class="card p-4 m-3 variant-ghost-primary">
          <h5>{ pa.progression.movement.slug }</h5>
          <div class="overflow-x-scroll  hide-scrollbar grid grid-flow-col auto-cols-max">
            {#each Array(pa.sets) as _, index}
              <button id="progression_{pa.id}_set_{index}" class="card p-2 m-2 variant-ringed-tertiary" on:click={ () => triggerModal(pa.id, pa.reps, pa.weight) }>
                <h6 class="p-2">Set { index + 1 }</h6>
                <h6 class="p-2">{ pa.weight > 0 ? pa.reps + " @ " + pa.weight : pa.reps }</h6>
              </button>
            {/each}
          </div>
        </div>
      {/each}
    {:else}
      <a href="/app/plan" type="button" class="btn p-4 variant-filled-surface w-full">Create a plan</a>
    {/if}
  {/await}
</div>
