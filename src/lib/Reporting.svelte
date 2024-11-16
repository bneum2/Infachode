<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  // State management
  let activeTab = 'reporting';
  let overtimeHours = '';
  let workloadRating = 5;
  let anonymousMessage = '';
  let chartCanvas;

  // Sample data stays the same
  const workloadData = [
    { week: 'Week 1', rating: 6 },
    { week: 'Week 2', rating: 7 },
    { week: 'Week 3', rating: 8 },
    { week: 'Week 4', rating: 7 },
    { week: 'Week 5', rating: 9 },
    { week: 'Week 6', rating: 8 },
    { week: 'Week 7', rating: 7 },
  ];

  const conditionsReports = [
    { date: '2024-03-15', type: 'Safety', description: 'Loading dock door malfunction reported' },
    { date: '2024-03-14', type: 'Equipment', description: 'Forklift maintenance overdue' },
    { date: '2024-03-12', type: 'Personnel', description: 'Short staffing in warehouse section B' }
  ];

  const unionMessages = [
    { date: '2024-03-16', message: 'Weekly meeting scheduled for Thursday 5 PM' },
    { date: '2024-03-15', message: 'Know your rights: Discussion of wages is protected speech' },
    { date: '2024-03-13', message: 'Remember to document all safety concerns' }
  ];

  // Functions
  const submitOvertimeReport = () => {
    console.log('Overtime hours submitted:', overtimeHours);
    overtimeHours = '';
  };

  const submitAnonymousPost = () => {
    console.log('Anonymous message submitted:', anonymousMessage);
    anonymousMessage = '';
  };

  // Chart initialization
  onMount(() => {
    const generateData = () => {
      const data = [];
      const labels = [];
      const highBurnoutDays = [12, 25, 35, 45];
      const lowBurnoutDays = [8, 18, 28, 38];

      for (let day = 0; day < 49; day++) {
        const weekNumber = Math.floor(day / 7) + 1;
        const dayOfWeek = day % 7;
        labels.push(dayOfWeek === 0 ? `Week ${weekNumber}` : '');

        let burnoutValue;
        if (highBurnoutDays.includes(day)) {
          burnoutValue = 10;
        } else if (lowBurnoutDays.includes(day)) {
          burnoutValue = 4;
        } else {
          burnoutValue = 6 + Math.random() * 3;
        }
        data.push(burnoutValue);
      }
      return { labels, data };
    };

    const { labels, data } = generateData();

    const chart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Daily Burnout Level',
          data: data,
          borderColor: '#7C3AED', // Updated to match primary-purple
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              title: (context) => {
                const dayIndex = context[0].dataIndex;
                const weekNumber = Math.floor(dayIndex / 7) + 1;
                const dayOfWeek = dayIndex % 7;
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return `Week ${weekNumber} - ${days[dayOfWeek]}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              font: { size: 10 }
            }
          },
          y: {
            min: 0,
            max: 10,
            ticks: { stepSize: 1 },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            title: {
              display: true,
              text: 'Burnout Level'
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  });
</script>

<div class="min-h-screen bg-surface-dim pb-16">
  <!-- Tab Navigation -->
  <div class="bg-white shadow-sm mb-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-2 gap-1">
        <button
          class="py-3 px-4 text-center transition-colors {activeTab === 'reporting' ? 'text-primary-purple border-b-2 border-primary-purple' : 'text-gray-600 hover:text-primary-purple'}"
          on:click={() => activeTab = 'reporting'}
        >
          Reporting
        </button>
        <button
          class="py-3 px-4 text-center transition-colors {activeTab === 'discussion' ? 'text-primary-purple border-b-2 border-primary-purple' : 'text-gray-600 hover:text-primary-purple'}"
          on:click={() => activeTab = 'discussion'}
        >
          Discussion
        </button>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto p-4 space-y-4">
    {#if activeTab === 'reporting'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Overtime Reporting Widget -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-primary-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <h2 class="text-lg font-semibold">Report Overtime</h2>
          </div>
          <div class="space-y-4">
            <input
              type="number"
              placeholder="Enter overtime hours"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              bind:value={overtimeHours}
            />
            <button
              class="w-full bg-primary-purple hover:bg-primary-purple/90 text-white py-3 px-4 rounded-lg transition-colors"
              on:click={submitOvertimeReport}
            >
              Submit Report
            </button>
          </div>
        </div>

        <!-- Workload Assessment Widget -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-primary-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <h2 class="text-lg font-semibold">Workload Assessment</h2>
          </div>
          <div class="space-y-6">
            <div>
              <p class="mb-2 text-gray-600">Rate your current workload (1-10):</p>
              <input
                type="range"
                min="1"
                max="10"
                class="w-full"
                bind:value={workloadRating}
              />
              <p class="mt-2 text-sm text-gray-600">Current rating: {workloadRating}</p>
            </div>
            <div class="h-48">
              <canvas bind:this={chartCanvas}></canvas>
            </div>
          </div>
        </div>

        <!-- Workplace Conditions Widget -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-primary-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <h2 class="text-lg font-semibold">Workplace Conditions</h2>
          </div>
          <div class="space-y-3">
            {#each conditionsReports as report}
              <div class="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p class="text-sm text-gray-500">{report.date}</p>
                <p class="font-medium text-primary-purple">{report.type}</p>
                <p class="text-gray-600">{report.description}</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- Union Information Widget -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-primary-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <h2 class="text-lg font-semibold">Union Updates</h2>
          </div>
          <div class="space-y-3">
            {#each unionMessages as msg}
              <div class="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p class="text-sm text-gray-500">{msg.date}</p>
                <p class="text-gray-600">{msg.message}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    {#if activeTab === 'discussion'}
      <div class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-lg font-semibold mb-4">Anonymous Discussion Board</h2>
        <div class="space-y-4">
          <textarea
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
            rows="4"
            placeholder="Share your thoughts anonymously..."
            bind:value={anonymousMessage}
          ></textarea>
          <button
            class="w-full bg-primary-purple hover:bg-primary-purple/90 text-white py-3 px-4 rounded-lg transition-colors"
            on:click={submitAnonymousPost}
          >
            Post Anonymously
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    background-color: rgb(249, 250, 251);
  }

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #7C3AED;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  .bg-surface-dim {
    background-color: rgb(249, 250, 251);
  }

  .text-primary-purple {
    color: #7C3AED;
  }

  .bg-primary-purple {
    background-color: #7C3AED;
  }

  .border-primary-purple {
    border-color: #7C3AED;
  }
</style>