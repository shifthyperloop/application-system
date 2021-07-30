<script lang="ts">
  import {_} from 'svelte-i18n'
  import getAdmissions from "../../api/admissions/getAdmissions";
  import deleteAdmission from "../../api/admission/deleteAdmission";
  import AdmissionListItem from "./AdmissionListItem.svelte";
  import NewAdmissionInput from "./NewAdmissionInput.svelte";
  import Admission from "../../model/Admission";
  import LoaderPage from "../Loader/LoaderPage.svelte";

  let admissions: Admission[] | Promise<Admission[]> = getAdmissions();

  let onNewAdmission = async () => {
    admissions = getAdmissions();
  }

  let deleteAdmissionClick = async (id: string) => {
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
        <LoaderPage />
    {:then admissions}
        <h1>{$_('app.page.Admissions.title')}</h1>
        <ul>
            {#each admissions as admission}
                <AdmissionListItem admission={admission} deleteAdmission={deleteAdmissionClick} />
            {/each}
            <NewAdmissionInput onNewAdmission={onNewAdmission}/>
        </ul>
    {:catch error}
        <h1>{error}</h1>
    {/await}
</div>