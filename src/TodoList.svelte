<script>
import { tap } from "rxjs";

  import TodoItem from "./TodoItem.svelte";

  import {
    addDocument,
    getAllDocuments,
    removeDocument,
    updateDocument,
  } from "./todos.repository";

  export let uid;
  let todos;
  let text = "";

  todos = getAllDocuments(uid).pipe(tap(todos => console.log(todos)));

  function add() {
    addDocument({ uid, text });
    text = "";
  }

  function updateStatus(event) {
    updateDocument(event.detail);
  }

  function removeItem({ detail }) {
    removeDocument(detail.id);
  }
</script>

<section>
  <ul>
    {#each $todos as todo}
      <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
    {/each}
  </ul>

  <input bind:value={text} placeholder="Some task" />

  <hr />

  <p>Your task: <strong>{text}</strong></p>

  <button class="button is-info" on:click={add}>Add Task</button>
</section>

<style>
  input {
    display: block;
  }

</style>
