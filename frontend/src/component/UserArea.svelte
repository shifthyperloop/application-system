<script>
    import {_} from 'svelte-i18n';
    import logout from "../api/auth/logout";

    const logoutClick = () => {
        logout();
    }

</script>

<style>
    .userArea {
        background: #DDDDDD;
        color: black;
    }
</style>


<div class="userArea">
    <input type="button" value="logout" on:click={logoutClick} />
    <p>Not logged in</p>
</div>
