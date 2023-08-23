<script lang="ts">
  export let parent: any;

  import { modalStore } from "@skeletonlabs/skeleton";

	const formData = {
		reps: $modalStore[0].meta.reps,
		weight: $modalStore[0].meta.weight,
		rpe: 1
	};

  function onSubmit() {
    modalStore.close();
  }

	const cBase = 'card p-4 w-modal-slim shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
  <div class="{cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Reps</span>
				<input class="input" type="number" bind:value={formData.reps} placeholder="Enter name..." />
			</label>
			<label class="label">
				<span>Weight</span>
				<input class="input" type="number" bind:value={formData.weight} placeholder="Enter phone..." />
			</label>
			<label class="label">
				<span>RPE</span>
				<input class="input" type="number" bind:value={formData.rpe} placeholder="Enter email address..." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onSubmit}>Complete</button>
    </footer>
  </div>
{/if}
