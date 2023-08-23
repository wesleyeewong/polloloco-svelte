<script lang="ts">
	import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';
  import { get } from 'svelte/store';
  import { progressions } from './app_store';
  import type { Writable } from 'svelte/store';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

  let progression = $progressions[0];
  const dayIndex = $modalStore[0].meta.dayIndex;
  const planStore: Writable<NewPlan> = $modalStore[0].meta.planStore

	// Handle Form Submission
	function onFormSubmit(): void {
    planStore.update(plan => {
      plan.days[dayIndex].progression_ids.push(progression.id);
      plan.days[dayIndex].progressions.push(progression);

      return plan;
    });
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
    {#if $progressions.length > 0}
      <ListBox class="border border-surface-500 p-4 rounded-container-token">
        {#each $progressions as progression_item}
          <ListBoxItem bind:group={progression} name={progression_item.name} value={progression_item}>{progression_item.name}</ListBoxItem>
        {/each}
      </ListBox>
    {:else}
      <p>You don't have progressions, create some first...</p>
    {/if}
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive} variant-filled-primary" on:click={onFormSubmit}>Select</button>
    </footer>
	</div>
{/if}
