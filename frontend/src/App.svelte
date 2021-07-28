<script>
    import {Router, Route} from 'svelte-navigator';
    import {addMessages, getLocaleFromNavigator, init} from 'svelte-i18n';
    import AdmissionsPage from "./pages/Admissions/AdmissionsPage.svelte";
    import AdmissionPage from "./pages/Admission/AdmissionPage.svelte";
    import NavigationBar from "./components/NavigationBar.svelte";

    import en from './intl/en.json';
    import no from './intl/no.json';

    addMessages('en', en);
    addMessages('no', no);

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
</script>

<Router>
    <NavigationBar />
    <main>
        <Route component={AdmissionsPage} />
        <Route path="/admission/*admissionId" component={AdmissionPage} />
    </main>
</Router>