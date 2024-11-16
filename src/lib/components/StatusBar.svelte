<script>
    import { Clock, Signal, Battery } from 'lucide-svelte';
  </script>
  
  <div class="bg-surface-light px-4 py-2 flex justify-between items-center">
    <span class="text-sm font-medium">9:41</span>
    <div class="flex space-x-3 items-center">
      <Signal size={16} />
      <Battery size={16} />
    </div>
  </div>