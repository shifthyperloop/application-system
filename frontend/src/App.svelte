<script>
    import {Router, Route} from 'svelte-navigator';
    import {addMessages, getLocaleFromNavigator, init} from 'svelte-i18n';
    import AdmissionsPage from "./page/Admissions/AdmissionsPage.svelte";
    import AdmissionPage from "./page/Admission/AdmissionPage.svelte";
    import NavigationBar from "./component/NavigationBar.svelte";

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