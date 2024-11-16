<script>
    export let signatures;
    import { Users, Calendar } from 'lucide-svelte';
    
    $: progressWidth = (signatures.collected / signatures.needed) * 100;
  </script>
  
  <div class="bg-primary-blue p-4 rounded-xl text-white">
    <div class="flex items-center gap-2">
      <Users size={20} />
      <h2 class="text-base font-medium">Union Campaign Status</h2>
    </div>
    <p class="mt-2">{signatures.collected} signatures collected</p>
    <div class="mt-2 bg-white/20 rounded-full h-2">
      <div 
        class="bg-white rounded-full h-2 transition-all duration-500"
        style="width: {progressWidth}%"
      ></div>
    </div>
    <div class="flex items-center gap-2 text-sm mt-2">
      <Calendar size={16} />
      <p>{signatures.needed - signatures.collected} more needed · Due {signatures.deadline}</p>
    </div>
  </div>