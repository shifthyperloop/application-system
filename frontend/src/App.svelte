<script lang="ts">
  import {Route, Router} from 'svelte-navigator';
  import {addMessages, getLocaleFromNavigator, init} from 'svelte-i18n';
  import AdmissionsPage from "./page/Admissions/AdmissionsPage.svelte";
  import AdmissionPage from "./page/Admission/AdmissionPage.svelte";
  import NewAdmissionPage from "./page/NewAdmission/NewAdmissionPage.svelte";
  import NavigationBar from "./component/NavigationBar.svelte";
  import en from './intl/en.json';
  import no from './intl/no.json';
  import LoginPage from "./page/Login/LoginPage.svelte";
  import SignupPage from "./page/Signup/SignupPage.svelte";
  import getLoggedIn from "./api/auth/getLoggedIn";
  import {loggedInStore} from "./store/authStore";
  import LoaderPage from "./page/Loader/LoaderPage.svelte";
  import LoginNavigatorService from "./service/LoginNavigatorService.svelte";

  addMessages('en', en);
  addMessages('no', no);

  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });

  let loading = true;
  let isLoggedIn = false;
  loggedInStore.subscribe(value => {
    isLoggedIn = !!value
  });

  getLoggedIn().then(value => {
    loading = false;
    loggedInStore.set(value)
  });
</script>

{#if loading}
    <LoaderPage />
{:else}
  <Router>
    <LoginNavigatorService />
    {#if isLoggedIn}
      <NavigationBar />
    {/if}
    <main>
      <Route component={AdmissionsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/newAdmission" component={NewAdmissionPage} />
      <Route path="/admission/*admissionId" component={AdmissionPage} />
    </main>
  </Router>
{/if}