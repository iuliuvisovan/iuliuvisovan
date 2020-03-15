moment.locale('ro');

function draw() {
  drawChart('romaniaChart', 'Romania');
  drawChart('otherCountryChart', 'Italy');
  setPickerCountries(window.data);
  setTimeout(() => {
    document.getElementById('countryPicker').value = 'Italy';
  }, 0);
}

var otherCountryChart = undefined;

function drawChart(chartId, countryName) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const data = window.data;
  const romanianData = data
    .filter(x => x.CountryExp == countryName)
    .slice(0, 18)
    .reverse();
  const labels = romanianData.map(x => moment(x.DateRep).format('DD MMMM'));
  const values = romanianData.map(x => x.NewConfCases);
  const maxValue = Math.max(...values);

  otherCountryChart = new Chart(ctx, {
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
              max: Math.ceil((maxValue + maxValue / 10) / 5) * 5
            }
          }
        ]
      }
    }
  });
}

function drawComparedCountry() {
  otherCountryChart.destroy();

  const picker = document.getElementById('countryPicker');
  drawChart('otherCountryChart', picker.value);
}

function setPickerCountries(data) {
  const picker = document.getElementById('countryPicker');

  const countries = [...new Set(data.map(x => x.CountryExp))];
  countries.forEach(countryName => {
    const option = document.createElement('option');
    option.innerText = countryName;
    picker.appendChild(option);
  });
}

draw();
