<script lang="ts">
  import {_} from 'svelte-i18n'
  import getAllAdmissions from "../../api/admission/getAllAdmissions";
  import deleteAdmission from "../../api/admission/deleteAdmission";
  import AdmissionListItem from "./AdmissionListItem.svelte";
  import {Link} from 'svelte-navigator';
  import Admission from "../../model/Admission";
  import LoaderPage from "../Loader/LoaderPage.svelte";

  let admissions: Admission[] | Promise<Admission[]> = getAllAdmissions();

  let deleteAdmissionClick = async (id: string) => {
      //TODO(eik): confirmation modal
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
            <Link to="/newAdmission">{$_("app.page.Admissions.new")}</Link>
        </ul>
    {:catch error}
        <h1>{error}</h1>
    {/await}
</div>