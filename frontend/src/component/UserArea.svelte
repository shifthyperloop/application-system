<script lang="ts">
    import {_} from 'svelte-i18n';
    import logout from "../api/auth/logout";
    import {loggedInStore} from "../store/authStore";
    import User from "../model/User";

    const logoutClick = () => {
        logout();
    }

    let loggedInUser: User;
    loggedInStore.subscribe(value => value && (loggedInUser = value));
</script>

<style>
    .userArea {
        background: #DDDDDD;
        color: black;
        display: flex;
    }
    .userInfo {
        max-width: 175px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .userInfo p {
        margin: 0 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .userArea input {
        height: 100%;
        padding: 15px;
        background: #0072BC;
        color: white;
        border: 0;
        border-radius: 0;
    }
    .userArea input:hover {
        background: #015992;
    }
</style>


<div class="userArea">
    <div class="userInfo">
        <p>{loggedInUser.name}</p>
        <p>{loggedInUser.email}</p>
    </div>
    <input type="button" value={$_("app.components.UserArea.logout")} on:click={logoutClick} />
</div>
