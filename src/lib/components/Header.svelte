<script>
    export let userData;
    import { User } from 'lucide-svelte';
  </script>
  
  <div class="bg-surface-light p-4 rounded-xl flex justify-between items-start">
    <div>
      <h1 class="text-xl font-semibold">Good morning, {userData.name}</h1>
      <p class="text-gray-600">{userData.union} · {userData.division}</p>
    </div>
    <button class="p-2 rounded-full bg-surface-dim">
      <User size={20} />
    </button>
  </div>