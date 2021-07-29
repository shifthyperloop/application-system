<script>
    import getAdmission from "../../api/admission/getAdmission";

    let admissionPromise;
    $: admissionPromise = getAdmission(admissionId);

    export let admissionId;
</script>

<style>

</style>

{#await admissionPromise}
    <p>Loading...</p>
{:then admission}
    <h1>{admission.name}</h1>
{:catch error}
    <h1>{error}</h1>
{/await}