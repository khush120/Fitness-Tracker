// script.js

// Variables
let exercises = [];
let weeklyCalories = 0;
let weeklyGoal = 0;

// Chart.js setup
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Calories Burned',
      data: Array(7).fill(0),
      backgroundColor: 'rgba(0, 123, 230, 0.6)',
      borderColor: 'rgba(0, 123, 230, 1)',
      borderWidth: 1,
    }],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Utility to update the progress bar
function updateProgressBar() {
  const progress = Math.min((weeklyCalories / weeklyGoal) * 100, 100);
  document.getElementById('progressBar').style.width = `${progress}%`;
}

// Add exercise
document.getElementById('logForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const exercise = document.getElementById('exercise').value;
  const duration = parseInt(document.getElementById('duration').value);
  const weight = parseInt(document.getElementById('weight').value);
  const intensity = document.getElementById('intensity').value;

  // Calculate calories burned
  const metValues = { low: 4, medium: 6, high: 8 };
  const met = metValues[intensity];
  const calories = Math.round((met * weight * duration) / 60);

  // Update weekly data
  const dayIndex = new Date().getDay() - 1; // Day index: Mon=0, ..., Sun=6
  progressChart.data.datasets[0].data[dayIndex] += calories;
  progressChart.update();

  // Update total calories and log
  weeklyCalories += calories;
  exercises.push({ exercise, duration, calories });
  document.getElementById('historyList').innerHTML += `<li>${exercise}: ${calories} calories (${duration} min)</li>`;

  updateProgressBar();
  e.target.reset();
});

// Set goal
document.getElementById('setGoal').addEventListener('click', () => {
  const goal = parseInt(document.getElementById('goal').value);
  weeklyGoal = goal;
  document.getElementById('goalDisplay').textContent = `Weekly Goal: ${goal} calories`;
  updateProgressBar();
});


