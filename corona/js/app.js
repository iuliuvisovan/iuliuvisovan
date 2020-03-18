moment.locale('ro');

function draw() {
  cleanupData();
  drawDailyCasesChart('romaniaChart', 'Romania');
  setTimeout(() => {
    drawDailyCasesChart('otherCountryChart', 'Italy', '#CDDC39');
  }, 0);
  setPickerCountries(window.data);
  setTimeout(() => {
    setupBarLabels();
  }, 0);

  setTimeout(() => {
    drawTotalsChart();
    drawTotalsRomaniaRelative();
    drawLastWeekChart();
  }, 3000);
  setTimeout(() => {
    drawLastWeekTotalsRomaniaRelative();
    drawGlobalTotals();
    drawTotalsForCountry('romaniaTotals', 'Romania');
    drawTotalsForCountry('otherCountryTotals', 'Italy', '#CDDC39');
  }, 4500);
  setTimeout(() => {
    setupBarLabels();
  }, 0);
}

var otherCountryChart = undefined;
var otherCountryChartTotals = undefined;

function drawDailyCasesChart(chartId, countryName, color = '#ff9800') {
  const ctx = document.getElementById(chartId).getContext('2d');
  const data = window.data;

  const countryData = data
    .sort((a, b) => +moment(b.DateRep) - +moment(a.DateRep))
    .filter(x => x.CountryExp == countryName)
    .slice(0, 18)
    .reverse();
  const labels = countryData.map(x => moment(x.DateRep).format('DD MMMM'));
  const values = countryData.map(x => x.Cases);

  const maxValue = Math.max(...values);

  otherCountryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Cazuri noi',
          data: values,
          backgroundColor: color + '22',
          borderColor: color,
          borderWidth: 1
        }
      ]
    },
    options: {
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
      .map(x => x.Cases)
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
      labels: labels,
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
      .map(x => x.Cases)
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
      labels: labels,
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

function drawLastWeekTotalsRomaniaRelative() {
  const ctx = document.getElementById('lastWeekTotalsRomaniaRelative').getContext('2d');
  const data = window.data;

  const validData = data.filter(x => moment().diff(moment(x.DateRep), 'days') <= 7);

  const totals = {};

  validData.forEach(x => {
    totals[x.CountryExp] = validData
      .filter(y => y.CountryExp == x.CountryExp)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b);
  });

  const countriesWithTotals = Object.keys(totals).map(key => ({ countryName: key, total: totals[key] }));

  const sortedByTotalCases = countriesWithTotals.sort((a, b) => b.total - a.total);
  const romaniaIndex = sortedByTotalCases.indexOf(sortedByTotalCases.find(x => x.countryName == 'Romania'));

  const slicedRelativeToRomania = sortedByTotalCases.slice(romaniaIndex - 5, romaniaIndex + 5);

  const labels = [...new Set(slicedRelativeToRomania.map(x => x.countryName))];
  const values = slicedRelativeToRomania.map(x => x.total);
  const maxValue = Math.max(...values);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Cazuri in ultimele 7 zile',
          data: values,
          backgroundColor: '#2196F322',
          backgroundColor: [
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F3',
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F322'
          ],
          borderColor: '#2196F3',
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
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

function drawTotalsRomaniaRelative() {
  const ctx = document.getElementById('totalsRomaniaRelative').getContext('2d');
  const data = window.data;

  const validData = data;

  const totals = {};

  validData.forEach(x => {
    totals[x.CountryExp] = validData
      .filter(y => y.CountryExp == x.CountryExp)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b);
  });

  const countriesWithTotals = Object.keys(totals).map(key => ({ countryName: key, total: totals[key] }));

  const sortedByTotalCases = countriesWithTotals.sort((a, b) => b.total - a.total);
  const romaniaIndex = sortedByTotalCases.indexOf(sortedByTotalCases.find(x => x.countryName == 'Romania'));

  const slicedRelativeToRomania = sortedByTotalCases.slice(romaniaIndex - 5, romaniaIndex + 5);

  const labels = [...new Set(slicedRelativeToRomania.map(x => x.countryName))];
  const values = slicedRelativeToRomania.map(x => x.total);
  const maxValue = Math.max(...values);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Cazuri totale',
          data: values,
          backgroundColor: '#2196F322',
          backgroundColor: [
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F3',
            '#2196F322',
            '#2196F322',
            '#2196F322',
            '#2196F322'
          ],
          borderColor: '#2196F3',
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000',
              beginAtZero: true,
              max: Math.ceil((maxValue + maxValue / 10) / 10) * 10
            }
          }
        ]
      }
    }
  });
}

function drawGlobalTotals() {
  const ctx = document.getElementById('globalTotals').getContext('2d');
  const data = window.data;

  const labels = [...new Set(data.sort((a, b) => moment(a.DateRep) - moment(b.DateRep)).map(x => x.DateRep))];
  const localizedLabels = labels.map(x => moment(x).format('DD MMMM'));
  const values = labels.map(x =>
    data
      .filter(y => y.DateRep == x)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b, 0)
  );

  const summedDailyValues = values.map((x, i, a) => {
    const totalSoFar = values.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const maxValue = summedDailyValues[summedDailyValues.length - 1];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: localizedLabels.filter((x, i) => i % 3 == 0),
      datasets: [
        {
          label: 'Cazuri totale',
          data: summedDailyValues.filter((x, i) => i % 3 == 0),
          backgroundColor: '#F4433622',
          borderColor: '#F44336',
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000',
              beginAtZero: true,
              max: Math.ceil((maxValue + maxValue / 10) / 10) * 10
            }
          }
        ]
      }
    }
  });
}

function drawTotalsForCountry(chartId, countryName, color = '#2196F3') {
  const ctx = document.getElementById(chartId).getContext('2d');
  const data = window.data;

  const labels = [...new Set(data.sort((a, b) => moment(a.DateRep) - moment(b.DateRep)).map(x => x.DateRep))];
  const localizedLabels = labels.map(x => moment(x).format('DD MMMM'));
  const values = labels.map(x =>
    data
      .filter(y => y.DateRep == x && y.CountryExp == countryName)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b, 0)
  );

  const summedDailyValues = values.map((x, i, a) => {
    const totalSoFar = values.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const maxValue = summedDailyValues[summedDailyValues.length - 1];

  otherCountryChartTotals = new Chart(ctx, {
    type: 'line',
    data: {
      labels: localizedLabels.filter((x, i) => i > 40),
      datasets: [
        {
          label: 'Cazuri - ' + countryName,
          data: summedDailyValues.filter((x, i) => i > 40),
          backgroundColor: color + '22',
          borderColor: color,
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000',
              beginAtZero: true,
              max: Math.ceil((maxValue + maxValue / 10) / 10) * 10
            }
          }
        ]
      }
    }
  });
}

function cleanupData() {
  window.data = window.data.map(x => {
    let countryName = x['Countries and territories'];
    if (countryName.startsWith('Cases on an')) {
      countryName = 'Diamond Princess';
    }
    if (countryName.toLowerCase() == 'united kingdom') {
      countryName = 'United Kingdom';
    }
    if (countryName == 'Romania') {
      if (x.DateRep == '03/18/2020') {
        x.Cases = '43';
      }
      if (x.DateRep == '03/17/2020') {
        x.Cases = '49';
      }
      if (x.DateRep == '03/16/2020') {
        x.Cases = '29';
      }
      if (x.DateRep == '03/15/2020') {
        x.Cases = '39';
      }
      if (x.DateRep == '03/14/2020') {
        x.Cases = '31';
      }
      if (x.DateRep == '03/13/2020') {
        x.Cases = '24';
      }
    }
    if (countryName == 'Italy') {
      if (x.DateRep == '03/16/2020') {
        x.Cases = '3230';
      }
      if (x.DateRep == '03/15/2020') {
        x.Cases = '3090';
      }
    }
    return {
      ...x,
      CountryExp: countryName
    };
  });
}

function drawComparedCountry(picker) {
  otherCountryChart.destroy();

  drawDailyCasesChart('otherCountryChart', picker.value, '#CDDC39');
}

function drawComparedCountryTotalCases(picker) {
  otherCountryChartTotals.destroy();
  drawTotalsForCountry('otherCountryTotals', picker.value, '#CDDC39');
}

function setPickerCountries(data) {
  const pickers = document.querySelectorAll('.country-picker');

  const countries = [...new Set(data.map(x => x.CountryExp))];

  pickers.forEach(picker => {
    countries.forEach(countryName => {
      const option = document.createElement('option');
      option.innerText = countryName;
      picker.appendChild(option);
    });
    picker.value = 'Italy';
  });
}

function setupBarLabels() {
  Chart.pluginService.register({
    afterDraw: function(chartInstance) {
      var ctx = chartInstance.chart.ctx;

      // render the value of the chart above the bar
      ctx.font = Chart.helpers.fontString(
        Chart.defaults.global.defaultFontSize,
        'normal',
        Chart.defaults.global.defaultFontFamily
      );
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      chartInstance.data.datasets.forEach(function(dataset) {
        for (var i = 0; i < dataset.data.length; i++) {
          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
          ctx.fillText(dataset.data[i], model.x, model.y - 2);
        }
      });
    }
  });
}

draw();
