<script lang="ts">
    import LargeLogo from "./LargeLogo.svelte";
</script>

<style>
    .centered {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .formBox {
        margin-top: 20px;
        background: #f4f4f4;
        color: #333333;
        width: 500px;
    }
</style>

<div class="centered">
    <LargeLogo />
    <div class="formBox">
        <slot />
    </div>
</div>