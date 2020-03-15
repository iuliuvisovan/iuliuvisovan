moment.locale('ro-RO');

function draw() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const data = window.data;
  const romanianData = data
    .filter(x => x.CountryExp == 'Romania')
    .slice(0, 18)
    .reverse();
  const labels = romanianData.map(x => moment(x.DateRep).format('DD MMMM'));
  const values = romanianData.map(x => x.NewConfCases);
  const maxValue = Math.max(...values);

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Cazuri noi',
          data: values,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      layout: {
        height: 500,
        padding: {
          top: 0
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: maxValue + maxValue / 10
            }
          }
        ]
      }
    }
  });
}

draw();
