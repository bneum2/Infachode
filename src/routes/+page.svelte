<script>
    import { onMount } from 'svelte';
    import { Clock, AlertCircle } from 'lucide-svelte';
    import StatusBar from '$lib/components/StatusBar.svelte';
    import Header from '$lib/components/Header.svelte';
    import SurplusCard from '$lib/components/SurplusCard.svelte';
    import UnionProgress from '$lib/components/UnionProgress.svelte';
    import ActionCard from '$lib/components/ActionCard.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    
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
  </script>
  
  <div class="min-h-screen bg-surface-dim pb-16">
    <StatusBar />
    
    <div class="p-4 space-y-4">
      <Header {userData} />
      <SurplusCard surplusValue={userData.surplusValue} wages={userData.wages} />
      <UnionProgress signatures={userData.signatures} />
      
      <div class="grid grid-cols-2 gap-4">
        <ActionCard 
          title="Report Overtime"
          count={userData.overtimeReports}
          icon={Clock}
          color="primary-purple"
        />
        <ActionCard 
          title="Discussion Board"
          count={userData.newMessages}
          icon={AlertCircle}
          color="primary-green"
        />
      </div>
      
      <!-- Map component would go here -->
    </div>
    
    <Navigation />
  </div>