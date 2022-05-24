<script>
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();

  export let id;
  export let text;
  export let complete;
  export let created;

  function remove() {
    dispatcher("remove", { id });
  }

  function toggleStatus() {
    dispatcher("toggle", {
      id,
      newStatus: !complete,
    });
  }
</script>

<li in:fly={{ x: 900, duration: 500 }}>
  <span class:complete>
    {text}
  </span>

  {#if complete}
    <button class="is-button" on:click={toggleStatus}> ✔️ </button>
  {:else}
    <button class="is-button" on:click={toggleStatus}> ❌ </button>
  {/if}

  <button class="is-button" on:click={remove}> 🗑️ </button>
</li>

<style>
  .complete {
    text-decoration: line-through;
    color: green;
  }

  li {
    display: flex;
    font-size: 1.2em;
    font-weight: bold;
  }
  span {
    margin-right: auto;
  }
</style>
