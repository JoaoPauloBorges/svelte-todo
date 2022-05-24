<script>
  import Profile from "./Profile.svelte";
  import TodoList from "./TodoList.svelte";
  import { googleProvider, auth, signInWithPopup } from "./firebase";

  import { authState } from "rxfire/auth";
  import { tap } from "rxjs";

  let user = authState(auth).pipe(tap((user) => console.log(user)));

  function login() {
    signInWithPopup(auth, googleProvider);
  }
</script>

<section>
  {#if $user}
    <Profile {...$user} />
    <button on:click={() => auth.signOut()} class="button">Logout</button>
    <hr />
    <TodoList uid={$user.uid} />
  {:else}
    <button on:click={login} class="button"> Signin with Google </button>
  {/if}
</section>

<style>
  section {
    background: rgb(235, 235, 235);
    padding: 20px;
  }
</style>
