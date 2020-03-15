moment.locale('ro');

function draw() {
  drawDailyCasesChart('romaniaChart', 'Romania');
  drawDailyCasesChart('otherCountryChart', 'Italy');
  setPickerCountries(window.data);
  setTimeout(() => {
    document.getElementById('countryPicker').value = 'Italy';
  }, 0);

  drawTotalsChart();
  drawLastWeekChart();
}

var otherCountryChart = undefined;

function drawDailyCasesChart(chartId, countryName) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const data = window.data;
  console.log('data', data);

  const countryData = data
    .filter(x => x.CountryExp == countryName)
    .slice(0, 18)
    .reverse();
  const labels = countryData.map(x => moment(x.DateRep).format('DD MMMM'));
  const values = countryData.map(x => x.NewConfCases);
  const maxValue = Math.max(...values);
  const total = values.reduce((a, b) => (a = b));

  otherCountryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Cazuri noi',
          data: values,
          backgroundColor: '#ff980022',
          borderColor: '#ff9800',
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

function drawTotalsChart() {
  const ctx = document.getElementById('totalsChart').getContext('2d');
  const data = window.data;

  const totals = {};

  data.forEach(x => {
    totals[x.CountryExp] = data
      .filter(y => y.CountryExp == x.CountryExp)
      .map(x => x.NewConfCases)
      .reduce((a, b) => +a + +b);
  });

  const countriesWithTotals = Object.keys(totals).map(key => ({ countryName: key, total: totals[key] }));

  const sortedByTotalCases = countriesWithTotals.sort((a, b) => b.total - a.total).slice(0, 10);

  const labels = [...new Set(sortedByTotalCases.map(x => x.countryName))];
  const values = sortedByTotalCases.map(x => x.total);
  const maxValue = Math.max(...values);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(x => (x.startsWith('Cases on an') ? 'Diamond Princess' : x)),
      datasets: [
        {
          label: 'Cazuri totale',
          data: values,
          backgroundColor: '#E91E6322',
          borderColor: '#E91E63',
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
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
              max: Math.ceil((maxValue + maxValue / 10) / 10) * 10
            }
          }
        ]
      }
    }
  });
}

function drawLastWeekChart() {
  const ctx = document.getElementById('lastWeekTotals').getContext('2d');
  const data = window.data;

  const validData = data.filter(x => moment().diff(moment(x.DateRep), 'days') <= 7);

  const totals = {};

  validData.forEach(x => {
    totals[x.CountryExp] = validData
      .filter(y => y.CountryExp == x.CountryExp)
      .map(x => x.NewConfCases)
      .reduce((a, b) => +a + +b);
  });

  const countriesWithTotals = Object.keys(totals).map(key => ({ countryName: key, total: totals[key] }));

  const sortedByTotalCases = countriesWithTotals.sort((a, b) => b.total - a.total).slice(0, 10);

  const labels = [...new Set(sortedByTotalCases.map(x => x.countryName))];
  const values = sortedByTotalCases.map(x => x.total);
  const maxValue = Math.max(...values);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(x => (x.startsWith('Cases on an') ? 'Diamond Princess' : x)),
      datasets: [
        {
          label: 'Cazuri in ultimele 7 zile',
          data: values,
          backgroundColor: '#9c27b022',
          borderColor: '#9c27b0',
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
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
              max: Math.ceil((maxValue + maxValue / 10) / 10) * 10
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
  drawDailyCasesChart('otherCountryChart', picker.value);
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
