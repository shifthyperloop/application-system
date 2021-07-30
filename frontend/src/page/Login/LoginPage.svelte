<script lang="ts">
    import {_} from "svelte-i18n";
    import FullscreenForm from "../../component/FullscreenForm.svelte";
    import login from "../../api/auth/login";
    import {onMount} from "svelte";
    // @ts-ignore
    import {form} from "svelte-forms";
    import {Link} from "svelte-navigator";


    let email = "";
    let password = "";

    let loginClick = async () => {
        loginForm.validate();
        if ($loginForm.valid) {
          await login(email, password);
        }
    }

    let loginForm: any;

    onMount(() => {
        loginForm = form(() => ({
            email: {value: email, validators: ['required', 'email']},
            password: {value: password, validators: ['required']}
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
    <h1>{$_('app.page.Login.title')}</h1>
    <div class="form">
        <label>
            {$_('app.auth.email')}
            <input type="email" name="email" bind:value={email} on:input={() => $loginForm.fields.email.errors = []} />

            {#if $loginForm?.fields.email.errors.includes('required')}
                <p class="invalid">{$_('app.auth.email.error.required')}</p>
            {/if}

            {#if $loginForm?.fields.email.errors.includes('email')}
                <p class="invalid">{$_('app.auth.email.error.invalid')}</p>
            {/if}
        </label>

        <label>
            {$_('app.auth.password')}
            <input type="password" name="password" bind:value={password} on:input={() => $loginForm.fields.password.errors = []} />

            {#if $loginForm?.fields.password.errors.includes('required')}
                <p class="invalid">{$_('app.auth.password.error.required')}</p>
            {/if}
        </label>

        <input type="button" value={$_('app.page.Login.login')} on:click={loginClick} />

        <Link to="/signup">{$_("app.page.Login.signup")}</Link>
    </div>
</FullscreenForm>