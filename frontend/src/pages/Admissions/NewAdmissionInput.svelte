<script>
    import {_} from "svelte-i18n";
    import {form} from 'svelte-forms';
    import newAdmission from "../../api/admission/newAdmission";
    import {afterUpdate, onMount} from "svelte";

    export let onNewAdmission;

    let newAdmissionName = "";

    let newAdmissionClick = async (_) => {
        await newAdmission(newAdmissionName);
        newAdmissionName = "";
        onNewAdmission();
    }

    let newAdmissionForm;

    onMount(() => {
        newAdmissionForm = form(() => ({
            newAdmissionName: { value: newAdmissionName, validators: ['required'] }
        }), {
            validateOnChange: false
        });
    });

    afterUpdate(() => {
        newAdmissionForm.validate();
    });
</script>


<li>
    <label>
        {$_('app.page.Admissions.new')}
        <input type="text" name="newAdmissionName" bind:value={newAdmissionName} />
        <input type="button" disabled="{!$newAdmissionForm?.valid}" value={$_('app.page.Admissions.create')} on:click={newAdmissionClick} />
    </label>
</li>