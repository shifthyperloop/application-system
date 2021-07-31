<script context="module" lang="ts">
  export interface IOption {
      value: any;
      label: string;
  }
</script>
<script lang="ts">
  export let onSelect: (selected: any) => void;
  export let options: IOption[];

  let selected = options[0].value;

  $: onSelect(selected);
</script>

<style>
  .options {
      margin: 0.5em 0;
      display: flex;
      justify-content: space-around;
      border-radius: 5px;
      border: 1px solid white;
      overflow: hidden;
  }

  .options label {
      margin: 0;
      width: 0;
      flex-grow: 1;
      border-right: 1px solid white;
  }
  .options label:last-child {
      border-right: 0;
  }

  .options input {
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
      position: absolute;
  }
  .options input:checked + .label {
      background: #0072BC;
  }

  .options .label {
      padding: 10px;
      display: block;
  }
</style>

<div class="options">
  {#each options as option}
    <label>
      <input type="radio" value={option.value} bind:group={selected} />
      <span class="label">{option.label}</span>
    </label>
  {/each}
</div>