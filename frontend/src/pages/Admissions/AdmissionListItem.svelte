<script>
    export let admission, deleteAdmission;
</script>

<li>
    { admission.name }
    <input type="button" value="Delete"  on:click={() => deleteAdmission(admission._id)} />
</li>