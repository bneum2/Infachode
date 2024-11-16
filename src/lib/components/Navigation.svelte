<script>
    import { Home, FileText, Map, MessageSquare } from 'lucide-svelte';
    
    const navItems = [
      { icon: Home, label: 'Home' },
      { icon: FileText, label: 'Reports' },
      { icon: Map, label: 'Map' },
      { icon: MessageSquare, label: 'Chat' }
    ];
  </script>
  
  <nav class="fixed bottom-0 w-full bg-surface-light border-t border-gray-200">
    <div class="flex justify-around py-2">
      {#each navItems as item}
        <button class="p-3 rounded-lg hover:bg-surface-dim transition-colors">
          <svelte:component this={item.icon} size={24} />
          <span class="text-xs mt-1 block">{item.label}</span>
        </button>
      {/each}
    </div>
  </nav>