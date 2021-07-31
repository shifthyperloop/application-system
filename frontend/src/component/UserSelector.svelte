<script lang="ts">
  import User from "../model/User";
  import getAllUsers from "../api/user/getAllUsers";
  import MdClose from 'svelte-icons/md/MdClose.svelte'

  let users: User[] | Promise<User[]> = getAllUsers();

  export let onSelectedUsersUpdated: (selectedUsers: User[]) => void;

  let selectedUsers: User[] = [];
  $: onSelectedUsersUpdated(selectedUsers);

  const unselectUserClick = (unselectedUser: User) => {
    selectedUsers = selectedUsers.filter(user => user._id !== unselectedUser._id);
  }

  const selectUser = (selectedUser: User) => {
    selectedUsers = [...selectedUsers, selectedUser];
    searchText = "";
    inputField.focus();
  }

  const findUsers = async (searchText: string): Promise<User[]> => {
    if (!searchText) return [];

    const searchWords = searchText.toLowerCase().split(" ");
    let matchingUsers = (await users).filter(user => selectedUsers.indexOf(user) === -1);
    for (const word of searchWords) {
      matchingUsers = matchingUsers.filter((user: User) => {
        if (user.email.startsWith(word)) {
          return true;
        }
        const names = user.name.toLowerCase().split(" ");
        for (const name of names) {
          if (name.startsWith(word)) {
            return true;
          }
        }
        return false;
      });
    }
    return matchingUsers;
  }

  let inputField;
  let inputIsFocused = false;
  const setFocus = (focused: boolean) => inputIsFocused = focused;

  let searchText;
  $: userSuggestions = findUsers(searchText);
</script>

<style>
  .container {
      position: relative;
  }
  .inputBox {
      border: 1px solid grey;
      border-radius: 6px;
      background: white;
      display: flex;
      overflow: auto;
  }
  .inputBox input {
      border: 0;
      background: transparent;
      height: 50px;
      width: 150px;
      margin: 0;
      flex-grow: 1;
  }
  .inputBox input:focus {
      outline: none;
  }
  .inputBox:focus-within {
      outline: 5px auto -webkit-focus-ring-color;
  }
  .selectedUser {
      border: 1px solid grey;
      border-radius: 4px;
      background: #CCCCCC;
      color: black;
      margin: 5px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      max-width: 150px;
  }
  .selectedUser .name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
  }
  .selectedUser .remove {
      height: 20px;
      width: 20px;
      border-radius: 3px;
      margin-left: 5px;
      flex-shrink: 0;
  }
  .selectedUser .remove:hover {
      background: rgba(0,0,0,0.2);
  }
  .suggestions {
      position: absolute;
      top: 100%;
      width: 100%;
      background: white;
      text-align: left;
      color: black;
      border: 1px solid grey;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
  }
  .suggestion {
      border-bottom: 1px solid grey;
      padding: 8px;
      cursor: pointer;
  }
  .suggestion:last-child {
      border-bottom: 0;
  }
  .suggestion:hover {
      background: #dddddd;
  }
  .suggestion .email {
      color: grey;
      font-weight: lighter;
      margin-left: 20px;
  }
</style>

<div class="container">
  <div class="inputBox">
    {#each selectedUsers as selectedUser (selectedUser._id)}
      <div class="selectedUser">
        <span class="name">{selectedUser.name}</span>
        <div class="remove" on:click={() => unselectUserClick(selectedUser)}><MdClose /></div>
      </div>
    {/each}
    <input
        type="text"
        placeholder="Navn Navnesen"
        bind:this={inputField}
        bind:value={searchText}
        on:focus={() => setFocus(true)}
        on:blur={() => setFocus(false)}
    />
  </div>
  {#if searchText && inputIsFocused}
    <div class="suggestions">
      {#await userSuggestions}
        Loading...
      {:then suggestions}
        {#each suggestions as suggestedUser (suggestedUser._id)}
          <div
              class="suggestion"
              on:mousedown={(e) => {e.stopImmediatePropagation(); e.preventDefault()}}
              on:mouseup={() => selectUser(suggestedUser)}
          >
            {suggestedUser.name}
            <span class="email">{suggestedUser.email}</span>
          </div>
        {/each}
      {/await}
    </div>
  {/if}
</div>