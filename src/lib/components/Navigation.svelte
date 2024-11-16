<script>
    import { Home, FileText, Map, MessageSquare } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    
    const navItems = [
      { icon: Home, label: 'Home', path: '/' },
      { icon: FileText, label: 'Reports', path: '/jack' },
      { icon: Map, label: 'Map', path: '/map' },
      { icon: MessageSquare, label: 'Chat', path: '/chat' }
    ];
  
    function handleNavigation(path) {
      goto(path);
    }
  </script>
  
  <nav class="fixed bottom-0 w-full bg-surface-light border-t border-gray-200">
    <div class="flex justify-around py-2">
      {#each navItems as item}
        <button 
          class="p-3 rounded-lg hover:bg-surface-dim transition-colors"
          on:click={() => handleNavigation(item.path)}
        >
          <svelte:component this={item.icon} size={24} />
          <span class="text-xs mt-1 block">{item.label}</span>
        </button>
      {/each}
    </div>
  </nav>