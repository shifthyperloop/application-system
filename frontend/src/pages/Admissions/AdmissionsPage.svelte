<script>
    import { _ } from 'svelte-i18n'
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
    .content {
        text-align: center;
    }

    ul {
        margin: auto;
        display: block;
        width: 500px;
        list-style-type: none;
    }


</style>

<div class="content">
    {#await admissionsPromise}
        <p>{$_('app.page.Admissions.loading')}</p>
    {:then admissions}
        <h1>{$_('app.page.Admissions.title')}</h1>
        <ul>
            {#each admissions as admission}
                <Admission admission={admission} deleteAdmission={deleteAdmissionClick} />
            {/each}
            <li>
                <label>
                    {$_('app.page.Admissions.new')}
                    <input type="text" bind:value={newAdmissionName} />
                    <input type="button" value={$_('app.page.Admissions.create')} on:click={newAdmissionClick} />
                </label>
            </li>
        </ul>
    {:catch error}
        <h1>{error}</h1>
    {/await}
</div>