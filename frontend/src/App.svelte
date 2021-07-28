<script>
    import { Router, Route, Link } from 'svelte-navigator';
    import AdmissionsPage from "./pages/Admissions/AdmissionsPage.svelte";
    import AdmissionPage from "./pages/Admission/AdmissionPage.svelte";
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

<Router>
    <header>
        <nav>
            <div class="logo">
                <img src="/shift-logo-with-text.png">
                <span>Admissions System</span>
            </div>
            <Link class="navLink" to="/">Home</Link>
        </nav>
    </header>
    <main>
        <Route component={AdmissionsPage} />
        <Route path="/admission/*admissionId" component={AdmissionPage} />
    </main>
</Router>