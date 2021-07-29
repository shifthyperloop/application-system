<script>
    import {_} from 'svelte-i18n'
    import getAdmissions from "../../api/getAdmissions";
    import newAdmission from "../../api/newAdmission";
    import deleteAdmission from "../../api/deleteAdmission";
    import Admission from "./AdmissionListItem.svelte";
    import NewAdmissionInput from "./NewAdmissionInput.svelte";

    let admissions = getAdmissions();

    let onNewAdmission = async () => {
        admissions = await getAdmissions();
    }

    let deleteAdmissionClick = async (id) => {
        await deleteAdmission(id);
        admissions = (await admissions).filter(admission => admission._id !== id);
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
    {#await admissions}
        <p>{$_('app.page.Admissions.loading')}</p>
    {:then admissions}
        <h1>{$_('app.page.Admissions.title')}</h1>
        <ul>
            {#each admissions as admission}
                <Admission admission={admission} deleteAdmission={deleteAdmissionClick} />
            {/each}
            <NewAdmissionInput onNewAdmission={onNewAdmission}/>
        </ul>
    {:catch error}
        <h1>{error}</h1>
    {/await}
</div>