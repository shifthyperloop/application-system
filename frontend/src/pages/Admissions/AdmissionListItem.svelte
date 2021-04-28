<script>
    import { Link } from 'svelte-navigator';

    export let admission, deleteAdmission;
</script>

<li>
    <Link to="admission/{admission._id}">{ admission.name }</Link>
    <input type="button" value="Delete"  on:click={() => deleteAdmission(admission._id)} />
</li>