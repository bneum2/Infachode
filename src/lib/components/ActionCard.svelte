<script>
    export let title;
    export let count;
    export let icon;
    export let color = 'blue';
    export let onClick = () => {};
  </script>
  
  <button 
    class="bg-{color}-100 p-4 rounded-xl w-full text-left hover:bg-{color}-200 transition-colors"
    on:click={onClick}
  >
    <div class="flex items-center gap-2">
      <svelte:component this={icon} size={20} class="text-{color}-900" />
      <h3 class="text-{color}-900 font-medium">{title}</h3>
    </div>
    <p class="text-sm text-{color}-800 mt-2">
      {count} {count === 1 ? 'item' : 'items'}
    </p>
  </button>