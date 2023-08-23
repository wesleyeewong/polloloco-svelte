<script lang="ts">
  export let selected = false;
  export let label = "";
  export let href = "";

  $: classActive = selected ? "variant-filled-primary shadow-black shadow-md" : "variant-ringed-primary"
</script>

<a href={ href } class="btn mt-4 ml-2 mr-2 hover:variant-filled-primary hover:shadow-black hover:shadow-lg {classActive}">{ label }</a>
