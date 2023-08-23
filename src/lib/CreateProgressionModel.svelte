<script lang="ts">
  export let parent: any;

  import { modalStore } from "@skeletonlabs/skeleton";
	import { authorizedPost } from "./api_requests";
  import { movements } from "./app_store";

	const formData = {
    name: null,
    movement_id: null,
    initial_reps: 5,
    initial_sets: 5,
    initial_weight: 20,
    max_reps: 5,
    max_sets: 5,
    min_reps: 5,
    min_sets: 5,
    rep_increments: 1,
    set_increments: 1,
    weight_increments: 5
  };

  async function onSubmit() {
    let res = await authorizedPost("/progressions", formData);
    if (res.ok && $modalStore[0].response) {
      $modalStore[0].response(true);
    } else if ($modalStore[0].response) {
      $modalStore[0].response(false);
    }
    modalStore.close();
  }

	const cBase = 'card p-2 w-modal-wide shadow-xl space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
  <div class="{cBase}">
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span class="text-xs md:text-[16px]">Progression Name</span>
				<input class="input" type="text" bind:value={formData.name} placeholder="BB Squat 5x5" />
			</label>
			<label class="label">
				<span class="text-xs md:text-[16px]">Movement</span>
        <select class="select" bind:value={formData.movement_id}>
          {#each $movements as movement}
            <option value={movement.id}>
              {movement.slug}
            </option>
          {/each}
        </select>
			</label>

      <div class="input-group input-group-divider grid-cols-3">
        <label class="label">
          <span class="text-xs md:text-[16px]">Initial reps</span>
          <input class="input" type="number" bind:value={formData.initial_reps} placeholder="Initial reps" />
        </label>
        <label class="label">
          <span class="text-xs md:text-[16px]">Initial sets</span>
          <input class="input" type="number" bind:value={formData.initial_sets} placeholder="Initial sets" />
        </label>
        <label class="label">
          <span class="text-xs md:text-[16px]">Initial weight</span>
          <input class="input" type="number" bind:value={formData.initial_weight} placeholder="Initial weight" />
        </label>
      </div>

      <div class="input-group input-group-divider grid-cols-2">
        <label class="label">
          <span class="text-xs md:text-[16px]">Max reps</span>
          <input class="input" type="number" bind:value={formData.max_reps} placeholder="Max reps" />
        </label>
        <label class="label">
          <span class="text-xs md:text-[16px]">Max sets</span>
          <input class="input" type="number" bind:value={formData.max_sets} placeholder="Max sets" />
        </label>
      </div>

      <div class="input-group input-group-divider grid-cols-2">
        <label class="label">
          <span class="text-xs md:text-[16px]">Min reps</span>
          <input class="input" type="number" bind:value={formData.min_reps} placeholder="Min reps" />
        </label>
        <label class="label">
          <span class="text-xs md:text-[16px]">Min sets</span>
          <input class="input" type="number" bind:value={formData.min_sets} placeholder="Min sets" />
        </label>
      </div>

      <label class="label">
        <span class="text-xs md:text-[16px]">Rep increments</span>
        <input class="input" type="number" bind:value={formData.rep_increments} placeholder="Rep increments" />
      </label>
      <label class="label">
        <span class="text-xs md:text-[16px]">Set increments</span>
        <input class="input" type="number" bind:value={formData.set_increments} placeholder="Set increments" />
      </label>
      <label class="label">
        <span class="text-xs md:text-[16px]">Weight increments</span>
        <input class="input" type="number" bind:value={formData.weight_increments} placeholder="Weight increments" />
      </label>
	</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral} btn-sm md:btn-lg" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive} btn-sm md:btn-lg variant-filled-primary" on:click={onSubmit}>Complete</button>
    </footer>
  </div>
{/if}
