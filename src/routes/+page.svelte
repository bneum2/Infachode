<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    
    // Sample data - in a real app this would come from your backend
    let userData = {
      name: "Worker",
      union: "Local 123",
      division: "Manufacturing Division",
      surplusValue: 2450,
      wages: 725,
      signatures: {
        collected: 78,
        needed: 100,
        deadline: "March 15"
      },
      overtimeReports: 12,
      newMessages: 5
    };
  
    let progressWidth = (userData.signatures.collected / userData.signatures.needed) * 100;
  </script>
  
  <div class="min-h-screen bg-slate-50">
    <!-- Status Bar -->
    <div class="bg-white px-4 py-2 flex justify-between items-center">
      <span class="text-sm">9:41</span>
      <div class="flex space-x-2">
        <div class="w-4 h-4 rounded-full bg-black"></div>
        <div class="w-4 h-4 rounded-full bg-black"></div>
      </div>
    </div>
  
    <!-- Main Content -->
    <div class="p-4 space-y-4">
      <!-- Header -->
      <div class="bg-white p-4 rounded-xl">
        <h1 class="text-xl font-semibold">Good morning, {userData.name}</h1>
        <p class="text-gray-600">{userData.union} · {userData.division}</p>
      </div>
  
      <!-- Surplus Value Card -->
      <div class="bg-red-600 p-4 rounded-xl text-white">
        <h2 class="text-base font-medium">Surplus Value Generated</h2>
        <p class="text-2xl font-bold mt-2">${userData.surplusValue} / week</p>
        <p class="text-sm opacity-80">vs. ${userData.wages} wages received</p>
      </div>
  
      <!-- Union Status Card -->
      <div class="bg-blue-700 p-4 rounded-xl text-white">
        <h2 class="text-base font-medium">Union Campaign Status</h2>
        <p class="mt-2">{userData.signatures.collected} signatures collected</p>
        <!-- Progress Bar -->
        <div class="mt-2 bg-white/20 rounded-full h-2">
          <div 
            class="bg-white rounded-full h-2 transition-all duration-500"
            style="width: {progressWidth}%"
          ></div>
        </div>
        <p class="text-sm mt-2">
          {userData.signatures.needed - userData.signatures.collected} more needed · 
          Due {userData.signatures.deadline}
        </p>
      </div>
  
      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Report Overtime -->
        <div class="bg-blue-100 p-4 rounded-xl">
          <h3 class="text-blue-900 font-medium">Report Overtime</h3>
          <p class="text-sm text-blue-800 mt-2">
            {userData.overtimeReports} reports this week
          </p>
        </div>
  
        <!-- Discussion Board -->
        <div class="bg-gray-50 p-4 rounded-xl">
          <h3 class="text-blue-900 font-medium">Discussion Board</h3>
          <p class="text-sm text-blue-800 mt-2">
            {userData.newMessages} new messages
          </p>
        </div>
      </div>
  
      <!-- Workload Map -->
      <div class="bg-white p-4 rounded-xl">
        <h2 class="text-base font-medium text-blue-900">Workplace Heat Map</h2>
        <div class="mt-4 bg-blue-50 h-24 rounded-lg flex items-center justify-center">
          <span class="text-blue-400">Map Preview</span>
        </div>
      </div>
    </div>
  
    <!-- Navigation Bar -->
    <nav class="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div class="flex justify-around py-4">
        <button class="p-2">
          <div class="w-1 h-1 rounded-full bg-blue-900"></div>
        </button>
        <button class="p-2">
          <div class="w-1 h-1 rounded-full bg-blue-900"></div>
        </button>
        <button class="p-2">
          <div class="w-1 h-1 rounded-full bg-blue-900"></div>
        </button>
        <button class="p-2">
          <div class="w-1 h-1 rounded-full bg-blue-900"></div>
        </button>
      </div>
    </nav>
  </div>
  
  <style>
    /* Any custom styles that can't be handled by Tailwind would go here */
  </style>