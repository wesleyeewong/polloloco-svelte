<script lang="ts">
  import { authorizedGet, authorizedPost } from "$lib/api_requests";
	import { Modal, modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
  import ProgressionsListModal from "$lib/ProgressionsListModal.svelte";
  import CreateProgressionModel from "$lib/CreateProgressionModel.svelte";
	import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { movements, progressions } from "$lib/app_store";
	import { goto } from "$app/navigation";

  const newPlan = writable<NewPlan>({name: "", days: []});

  const progressionListModalComponent: ModalComponent = { ref: ProgressionsListModal };
  const createProgressionModalComponent: ModalComponent = { ref: CreateProgressionModel };

  function triggerProgressionListModal(dayIndex: number) {
    let modal: ModalSettings = {
      type: "component",
      component: progressionListModalComponent,
      title: "Select progression",
      meta: { dayIndex: dayIndex, planStore: newPlan }
    }
    modalStore.trigger(modal);
  }

  function triggerCreateProgressionModal() {
    new Promise<boolean>((resolve) => {
      let modal: ModalSettings = {
        type: "component",
        component: createProgressionModalComponent,
        response: (r: boolean) => { resolve(r) },
        title: "Create progression",
      }
      modalStore.trigger(modal);
    }).then((r: boolean) => {
      if (r) getProgressions();
    });

  }

  const addDay = () => {
    newPlan.update(plan => {
      plan.days.push({progressions: [], progression_ids: []});
      return plan;
    });
  }

  const getPlan = async() => {
    const res = await authorizedGet("/plans");

    if (res.status == 200) {
      const data = await res.json();
      console.log(data);
      return data as Plan;
    }

    return null;
  };

  const getMovements = async() => {
    const res = await authorizedGet("/movements");

    if (res.status == 200) {
      movements.set(await res.json());
    }
  }

  const getProgressions = async() => {
    const res = await authorizedGet("/progressions");

    if (res.status == 200) {
      progressions.set(await res.json());
    }
  }

  const createPlan = async() => {
    console.log($newPlan);
    const res = await authorizedPost("/plans", $newPlan);
    console.log(res);

    if (res.ok) {
      goto("/app/plan");
    }
  }

  onMount(() => {
    getMovements();
    getProgressions();
  })

</script>

<h1 class="p-4">Plan</h1>
<Modal />

<div class="card variant-soft-surface p-4 m-5 h-auto">
  {#await getPlan()}
    <p> Loading plan...</p>
  {:then data}
    {#if data !== null}
      <div>
        { data.name }

        <hr>

        <div class="overflow-x-scroll space-x-2 p-2 grid grid-flow-col hide-scrollbar">

          {#each data.days as day, day_index}
            <div class="card p-4 space-y-2 variant-ghost-tertiary overflow-y-scroll max-h-[400px] min-w-[300px] hide-scrollbar">
              Day { day_index + 1 }

              <hr>

              {#each day.progressions as progression}
                <div class="card p-2">
                  { progression.name }
                  { progression.movement.slug }
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>

    {:else}

      <div>
        <label class="label p-2">
          <input class="input" bind:value={ $newPlan.name } type="text" placeholder="Plan name">
        </label>

        <div class="space-y-2 space-x-2 p-2">
          <button on:click={ () => addDay() } class="inline-flex items-center duration-150 md:px-5 btn-sm md:btn-base variant-ringed p-2 rounded-full hocus:variant-filled-tertiary hocus:shadow-black hocus:shadow-md">
            <span><svg class="fill-current mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg></span>
            <span>Day</span>
          </button>
          <button on:click={ () => triggerCreateProgressionModal() } class="inline-flex items-center duration-150 md:px-5 btn-sm md:btn-base variant-ringed p-2 rounded-full hocus:variant-filled-tertiary hocus:shadow-black hocus:shadow-md">
            <span><svg class="fill-current  mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg></span>
            <span>Create Progression</span>
          </button>
        </div>

        <div class="overflow-x-scroll space-x-2 p-2 grid grid-flow-col hide-scrollbar">
          {#each $newPlan.days as day, day_index}
            <div class="card p-4 space-y-2 variant-ghost-tertiary overflow-y-scroll max-h-[400px] min-w-[300px] hide-scrollbar">
              Day { day_index + 1 }
              <button on:click={ () => triggerProgressionListModal(day_index) } class="inline-flex ml-5 items-center duration-150 md:px-5 btn-icon btn-sm variant-ringed p-2 rounded-full hocus:variant-filled-tertiary hocus:shadow-black hocus:shadow-md">
                <span><svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg></span>
              </button>
              <hr>
              {#if day.progressions.length > 0}
                {#each day.progressions as progression, progression_index}
                  <div class="card p-2">
                    { progression.name }
                    { progression.movement.slug }
                  </div>
                {/each}
              {:else}
                <p class="p-1">Empty day</p>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <button on:click={ () => createPlan() } class="btn variant-filled-primary hocus:shadow-black hocus:shadow-md mt-5">Create</button>
    {/if}
  {/await}
</div>
