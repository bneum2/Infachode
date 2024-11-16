<!-- SurveilAvoid.svelte -->
<script>
    import { onMount } from 'svelte';
    import { ChevronUp, Eye, EyeOff, MapPin} from 'lucide-svelte';
    
    let mapContainer;
    let isExpanded = false;
    let showManagerView = false;
    
    // Simulated manager location data
    let managerHeatmap = [
      { x: 30, y: 40, intensity: 0.8 },
      { x: 70, y: 60, intensity: 0.4 },
      { x: 50, y: 20, intensity: 0.6 }
    ];
    
    let userLocation = { x: 40, y: 50 };
    
    function toggleExpand() {
      isExpanded = !isExpanded;
    }
    
    function toggleManagerView() {
      showManagerView = !showManagerView;
    }
    
    const generateHeatmapGradient = (x, y, intensity) => {
      return `
        <circle 
          cx="${x}%" 
          cy="${y}%" 
          r="${intensity * 20}%" 
          fill="rgba(255, 71, 71, ${intensity * 0.3})"
        />
      `;
    };
  </script>
  
  <div class="bg-surface-light rounded-xl overflow-hidden {isExpanded ? 'h-96' : 'h-48'} transition-all duration-300">
    <!-- Header -->
    <div class="p-4 flex items-center justify-between bg-surface-dim border-b">
      <div class="flex items-center gap-2">
        <button
          class="p-2 rounded-full hover:bg-surface-dim transition-colors"
          class:text-primary-red={showManagerView}
          on:click={toggleManagerView}
        >
          {#if showManagerView}
            <Eye size={20} />
          {:else}
            <EyeOff size={20} />
          {/if}
        </button>
        <h2 class="text-base font-medium">Workplace Map</h2>
      </div>
      <button
        class="p-2 rounded-full hover:bg-surface-dim transition-colors transform"
        class:rotate-180={isExpanded}
        on:click={toggleExpand}
      >
        <ChevronUp size={20} />
      </button>
    </div>
  
    <!-- Map Container -->
    <div class="relative w-full h-full" bind:this={mapContainer}>
      <!-- Floor Plan SVG -->
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <!-- Minimal floor plan outline -->
        <path
          d="M10,10 L90,10 L90,90 L10,90 Z"
          stroke="#cbd5e1"
          stroke-width="0.5"
          fill="none"
        />
        
        <!-- Office areas -->
        <rect x="20" y="20" width="30" height="20" stroke="#cbd5e1" stroke-width="0.5" fill="none" />
        <rect x="60" y="20" width="20" height="20" stroke="#cbd5e1" stroke-width="0.5" fill="none" />
        <rect x="20" y="50" width="60" height="30" stroke="#cbd5e1" stroke-width="0.5" fill="none" />
  
        <!-- Manager heat zones (only shown when enabled) -->
        {#if showManagerView}
          {#each managerHeatmap as {x, y, intensity}}
            {@html generateHeatmapGradient(x, y, intensity)}
          {/each}
        {/if}
  
        <!-- User location -->
        <circle
          cx={`${userLocation.x}%`}
          cy={`${userLocation.y}%`}
          r="2"
          fill="#3b82f6"
          class="animate-ping"
        />
        <circle
          cx={`${userLocation.x}%`}
          cy={`${userLocation.y}%`}
          r="1"
          fill="#3b82f6"
        />
      </svg>
  
      <!-- Alert badge when manager nearby -->
      {#if showManagerView && managerHeatmap.some(m => 
        Math.abs(m.x - userLocation.x) < 20 && 
        Math.abs(m.y - userLocation.y) < 20 && 
        m.intensity > 0.5
      )}
        <div class="absolute top-4 right-4 bg-primary-red text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <Eye size={16} />
          <span>Manager Nearby</span>
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    /* Any additional styles */
    :global(.animate-ping) {
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
  
    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  </style>