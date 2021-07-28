<script>
    import {Router, Route} from 'svelte-navigator';
    import AdmissionsPage from "./pages/Admissions/AdmissionsPage.svelte";
    import AdmissionPage from "./pages/Admission/AdmissionPage.svelte";
</script>


<Router>
    <NavigationBar />
    <main>
        <Route component={AdmissionsPage} />
        <Route path="/admission/*admissionId" component={AdmissionPage} />
    </main>
</Router>