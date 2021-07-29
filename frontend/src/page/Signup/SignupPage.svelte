<script lang="ts">
  import {_} from "svelte-i18n";
  import FullscreenForm from "../../component/FullscreenForm.svelte";
  import {onMount} from "svelte";
  // @ts-ignore
  import {form} from "svelte-forms";
  import {navigate, Link} from "svelte-navigator";
  import signup from "../../api/auth/signup";

  let email = "";
  let name = "";
  let password = "";
  let confirmPassword = "";

  let signupClick = async () => {
    signupForm.validate();
    if ($signupForm.valid) {
      await signup(email, name, password);
      navigate("/");
    }
  }

  let signupForm: any;

  onMount(() => {
    signupForm = form(() => ({
      email: {value: email, validators: ['required', 'email']},
      name: {value: name, validators: ['required']},
      password: {value: password, validators: ['required', 'min:6']},
      confirmPassword: {value: confirmPassword, validators: [(value:string) => ({valid: password === value, name: 'notEqual'})]}
    }), {
      initCheck: false,
      validateOnChange: false
    });
  });
</script>

<style>
    h1 {
        text-align: center;
        margin: 40px 0;
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
        margin-top: 5px;
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
</style>

<FullscreenForm>
    <h1>{$_('app.page.Signup.title')}</h1>
    <div class="form">
        <label>
            {$_('app.auth.email')}
            <input type="email" name="email" bind:value={email} on:input={() => $signupForm.fields.email.errors = []} />

            {#if $signupForm?.fields.email.errors.includes('required')}
                <p class="invalid">{$_('app.auth.email.error.required')}</p>
            {/if}

            {#if $signupForm?.fields.email.errors.includes('email')}
                <p class="invalid">{$_('app.auth.email.error.invalid')}</p>
            {/if}
        </label>

        <label>
            {$_('app.page.Signup.name')}
            <input type="text" name="name" bind:value={name} on:input={() => $signupForm.fields.name.errors = []} />

            {#if $signupForm?.fields.email.errors.includes('required')}
                <p class="invalid">{$_('app.page.Signup.name.error.required')}</p>
            {/if}
        </label>

        <label>
            {$_('app.auth.password')}
            <input type="password" name="password" bind:value={password} on:input={() => $signupForm.fields.password.errors = []} />

            {#if $signupForm?.fields.password.errors.includes('required')}
                <p class="invalid">{$_('app.auth.password.error.required')}</p>
            {/if}
        </label>

        <label>
            {$_('app.page.Signup.confirmPassword')}
            <input type="password" name="confirmPassword" bind:value={confirmPassword} on:input={() => $signupForm.fields.confirmPassword.errors = []} />

            {#if $signupForm?.fields.confirmPassword.errors.includes('notEqual')}
                <p class="invalid">{$_('app.page.Signup.confirmPassword.error.notEqual')}</p>
            {/if}
        </label>


        <input type="button" value={$_('app.page.Signup.signup')} on:click={signupClick} />

        <Link to="/login">{$_("app.page.Signup.login")}</Link>
    </div>
</FullscreenForm>