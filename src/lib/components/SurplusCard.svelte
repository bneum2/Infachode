<script>
    export let surplusValue;
    export let wages;
    import { DollarSign, TrendingUp } from 'lucide-svelte';
  </script>
  
  <div class="bg-primary-red p-4 rounded-xl text-white">
    <div class="flex items-center gap-2">
      <DollarSign size={20} />
      <h2 class="text-base font-medium">Surplus Value Generated</h2>
    </div>
    <p class="text-2xl font-bold mt-2">${surplusValue} / week</p>
    <div class="flex items-center gap-2 text-sm opacity-80">
      <TrendingUp size={16} />
      <p>vs. ${wages} wages received</p>
    </div>
  </div>