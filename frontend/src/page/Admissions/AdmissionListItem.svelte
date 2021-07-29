<script lang="ts">
    import { Link } from 'svelte-navigator';
    import {_} from "svelte-i18n";
    import Admission from "../../model/Admission";

    export let admission: Admission,
        deleteAdmission: (id: string) => void;
</script>

<style>
    li {
        background: #333333;
        height: 60px;
        border: 1px solid #666666;
        border-top-width: 0;
        display: flex;
    }
    li:first-child {
        border-top-width: 1px;
    }
    li>:global(a) {
        color: #f4f4f4;
        height: 100%;
        line-height: 60px;
        margin: 0 10px;
        flex-grow: 1;
        font-size: 20px;
    }
    li>input {
        display: inline-block;
        border: 0;
        background: #444444;
        color: white;
        height: 100%;
    }
    li>input:hover {
        background: #666666;
    }
</style>

<li>
    <Link to="admission/{admission._id}">{ admission.name }</Link>
    <input type="button" value={$_("app.components.AdmissionListItem.delete")}  on:click={() => deleteAdmission(admission._id)} />
</li>