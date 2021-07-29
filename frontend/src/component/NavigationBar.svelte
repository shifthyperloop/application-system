<script>
    import {_} from 'svelte-i18n';
    import {Link} from 'svelte-navigator';
</script>

<style>
    nav {
        /*background-color: #0095DD;*/
        background: #666666;
        height: 60px;
        display: flex;
    }
    nav .logo {
        margin: auto 20px auto 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
    nav .logo>span {
        font-size: 1.3em;
    }
    nav .logo>img {
        height: 80%;
    }
    nav :global(.navLink) {
        display: inline-block;
        line-height: 60px;
        padding: 0 20px;
        background: #0072BC;
        color: white;
    }
</style>

<header>
    <nav>
        <div class="logo">
            <img src="/shift-logo-with-text.png"  alt="Shift hyperloop"/>
            <span>{$_("app.components.NavigationBar.admissionSystem")}</span>
        </div>
        <Link class="navLink" to="/">{$_("app.components.NavigationBar.home")}</Link>
    </nav>
</header>