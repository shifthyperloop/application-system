<script>
    import { Router, Route } from 'svelte-navigator';
    import AdmissionsPage from "./pages/Admissions/AdmissionsPage.svelte";
</script>

<Router>
    <main>
        <Route component={AdmissionsPage} />
    </main>
</Router>