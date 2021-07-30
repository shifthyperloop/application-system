<script>
    import getAdmission from "../../api/admission/getAdmission";
    import LoaderPage from "../Loader/LoaderPage.svelte";

    let admissionPromise;
    $: admissionPromise = getAdmission(admissionId);

    export let admissionId;
</script>

<style>

</style>

{#await admissionPromise}
    <LoaderPage />
{:then admission}
    <h1>{admission.name}</h1>
{:catch error}
    <h1>{error}</h1>
{/await}