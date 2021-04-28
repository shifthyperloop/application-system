<script>
    import getAdmissions from "../../api/getAdmissions";
    import newAdmission from "../../api/newAdmission";
    import deleteAdmission from "../../api/deleteAdmission";
    import Admission from "./AdmissionListItem.svelte";

    let admissionsPromise = getAdmissions();

    let newAdmissionName = "";

    let newAdmissionClick = async (_) => {
        await newAdmission(newAdmissionName);
        newAdmissionName = "";
        admissionsPromise = await getAdmissions();
    }

    let deleteAdmissionClick = async (id) => {
        await deleteAdmission(id);
        admissionsPromise = (await admissionsPromise).filter(admission => admission._id !== id);
    }
</script>

<style>

</style>

{#await admissionsPromise}
    <p>Loading...</p>
{:then admissions}
    <h1>Opptak:</h1>
    <ul>
        {#each admissions as admission}
            <Admission admission={admission} deleteAdmission={deleteAdmissionClick} />
        {/each}
        <li>Nytt: <input type="text" bind:value={newAdmissionName} /><input type="button" value="Lag" on:click={newAdmissionClick} /></li>
    </ul>
{:catch error}
    <h1>{error}</h1>
{/await}