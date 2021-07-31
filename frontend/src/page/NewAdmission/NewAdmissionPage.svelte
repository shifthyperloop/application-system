<script lang="ts">
  import {_} from 'svelte-i18n'
  import {onMount} from "svelte";
  import Admission from "../../model/Admission";
  // @ts-ignore
  import {form} from "svelte-forms";
  import OptionSelector from "../../component/OptionSelector.svelte";
  import UserSelector from "../../component/UserSelector.svelte";
  import User from "../../model/User";
  import {hasContent} from "../../utils/formValidators";
  import newAdmission from "../../api/admission/newAdmission";
  import {navigate} from "svelte-navigator";

  let admission: Admission = new Admission();
  admission.deleteDate = new Date();
  admission.deleteDate.setMonth(admission.deleteDate.getMonth() + 2);

  let deleteDateInput: string = admission.deleteDate.toISOString().substring(0, 10);
  $: admission.deleteDate = new Date(deleteDateInput);

  let groupNamesInput: string;
  $: groupNames = groupNamesInput?.split(",").map(str => str.trim());

  let createAdmissionClick = async () => {
    admissionForm.validate();
    if ($admissionForm.valid) {
      const savedAdmission = await newAdmission({...admission, groupNames});
      navigate("/admission/"+savedAdmission._id);
    }
  }

  let admissionForm: any;

  onMount(() => {
    admissionForm = form(() => ({
      name: {value: admission.name, validators: ['required']},
      admittingLeaders: {value: admission.admittingLeaders},
      admittingMembers: {value: admission.admittingMembers},
      userIds: {value: admission.userIds, validators: ['required', hasContent]},
      groupNames: {value: groupNames, validators: ['required', hasContent]},
      deleteDate: {value: admission.deleteDate, validators: ['required']},
    }), {
      initCheck: false,
      validateOnChange: false
    });
  });

  const onChangeAdmissionType = ([leader, member]: boolean[]): void => {
    admission.admittingLeaders = leader;
    admission.admittingMembers = member;
  }

  const onSelectedUsersUpdated = (selectedUsers: User[]) => {
    admission.userIds = selectedUsers.map(user => user._id);
  }

</script>

<style>
    .content {
        text-align: center;
    }

    .form {
        display: flex;
        flex-direction: column;
        margin: 40px;
    }
    .form label {
        font-weight: bold;
        margin-bottom: 30px;
    }
    .form input {
        display: block;
        width: 100%;
        height: 50px;
        border-radius: 6px;
        margin-top: 0.5em;
    }
    .form input[type="button"]:hover {
        background: #dddddd;
    }
    .form input[type="button"]:active {
        background: #666666;
    }
    .form .invalid {
        color: red;
        font-weight: normal;
        margin: 0;
    }
    .form .info {
        font-weight: normal;
        text-align: left;
        font-size: 0.8em;
    }

</style>

<div class="content">
  <h1>{$_("app.page.NewAdmission.title")}</h1>
  <div class="form">
    <label>
      {$_('app.page.NewAdmission.name')}
      <input
          type="text"
          name="name"
          placeholder={$_("app.page.NewAdmission.name.placeholder")}
          bind:value={admission.name}
          on:input={() => $admissionForm.fields.name.errors = []}
      />

      {#if $admissionForm?.fields.name.errors.includes('required')}
        <p class="invalid">{$_('app.page.NewAdmission.name.required')}</p>
      {/if}
    </label>

    <label>
      {$_('app.page.NewAdmission.admissionType')}
      <OptionSelector
          onSelect={(value) => onChangeAdmissionType(value)}
          options={[
              {value: [true, false], label: $_('app.page.NewAdmission.admissionType.leader')},
              {value: [false, true], label: $_('app.page.NewAdmission.admissionType.member')},
              {value: [true, true], label: $_('app.page.NewAdmission.admissionType.both')},
          ]}
      />
    </label>

    <label>
      {$_('app.page.NewAdmission.users')}
      <UserSelector onSelectedUsersUpdated={onSelectedUsersUpdated} />

      {#if $admissionForm?.fields.userIds.errors.includes('hasContent')}
        <p class="invalid">{$_('app.page.NewAdmission.users.required')}</p>
      {/if}
    </label>


    <label>
      {$_('app.page.NewAdmission.groupNames')}
      <input
          type="text"
          name="groupNames"
          placeholder={$_('app.page.NewAdmission.groupNames.placeholder')}
          bind:value={groupNamesInput}
      />
      <span class="info">{$_('app.page.NewAdmission.groupNames.info')}</span>


      {#if $admissionForm?.fields.groupNames.errors.includes('hasContent') || $admissionForm?.fields.groupNames.errors.includes('required')}
        <p class="invalid">{$_('app.page.NewAdmission.groupNames.required')}</p>
      {/if}
    </label>

    <label>
      {$_('app.page.NewAdmission.deleteDate')}
      <input
          type="date"
          name="deleteDate"
          bind:value={deleteDateInput}
      />
      <span class="info">{$_('app.page.NewAdmission.deleteDate.info')}</span>

      {#if $admissionForm?.fields.deleteDate.errors.includes('required')}
        <p class="invalid">{$_('app.page.NewAdmission.deleteDate.required')}</p>
      {/if}
    </label>

    <input type="button" value={$_('app.page.NewAdmission.save')} on:click={createAdmissionClick} />
  </div>
</div>