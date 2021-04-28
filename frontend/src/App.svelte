<script>
    import { Router, Route, Link } from 'svelte-navigator';
    import AdmissionsPage from "./pages/Admissions/AdmissionsPage.svelte";
    import AdmissionPage from "./pages/Admission/AdmissionPage.svelte";
</script>

<Router>
    <header>
        <nav>
            <Link to="/">Home</Link>
        </nav>
    </header>
    <main>
        <Route component={AdmissionsPage} />
        <Route path="/admission/*admissionId" component={AdmissionPage} />
    </main>
</Router>