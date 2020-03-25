moment.locale('ro');
const isMobile = window.innerWidth < 768;
const defaultDateFormat = isMobile ? 'DD.MM' : 'DD MMMM';
const formatThousandsAsK = value => (value > 999 ? value / 1000 + 'k' : value);

function init() {
  cleanupData();
  setTimeout(() => {
    populateLabelsSinceStartOfYear();
    setupBarLabels();
    setPickerCountries(window.data);
  }, 0);
}

var startTime;
var endTime;

function draw() {
  init();

  drawDailyCasesChart('romaniaChart', 'Romania');
  setTimeout(() => {
    drawTotalsForCountry('romaniaTotals', 'Romania');

    drawGlobalActiveCases();
    show('globalActiveCasesWrapper', document.querySelector('button'));

    drawDailyCasesChart('otherCountryChart', 'Italy', '#ffeb3b'); //8
    drawCountryActiveCases('Romania'); // 29
    drawTotalsForCountry('otherCountryTotals', 'Italy', '#ffeb3b'); //30
    drawLastWeekTotalsBars(); //122
    drawAllTimeTotalsBars(); //22
    drawGlobalTotals(); //22
  }, 0);
}

function setCurrentDate() {
  const currentDateSpan = document.getElementById('pageTitle');
  currentDateSpan.innerText = 'Situatia COVID-19 la data de ' + moment().format('DD MMMM YYYY');
}

var otherCountryChart = undefined;
var otherCountryChartTotals = undefined;
var countryActiveCases = undefined;

function drawDailyCasesChart(chartId, countryName, color = '#ff9800') {
  const ctx = document.getElementById(chartId).getContext('2d');
  const data = window.data;

  const countryData = data
    .filter(x => x.CountryExp == countryName)
    .sort((a, b) => +moment(b.DateRep, 'MM/DD/YYYY') - +moment(a.DateRep, 'MM/DD/YYYY'))
    .slice(0, isMobile ? 15 : 25)
    .reverse();

  const labels = countryData.map(x => moment(x.DateRep, 'MM/DD/YYYY').format(defaultDateFormat));
  const values = countryData.map(x => x.Cases);
  const deaths = countryData.map(x => +x.Deaths);
  const recoveries = countryData.map(x => +x.Recoveries);

  otherCountryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Infectari',
          data: values,
          backgroundColor: color + '22',
          borderColor: color,
          borderWidth: 1
        },
        {
          label: 'Vindecari',
          data: recoveries,
          backgroundColor: '#4CAF5022',
          borderColor: '#4CAF50',
          borderWidth: 1
        },
        {
          label: 'Morti',
          data: deaths,
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
              callback: formatThousandsAsK
            }
          }
        ]
      },
      layout: {
        padding: {
          right: 10
        }
      }
    }
  });
}

function drawAllTimeTotalsBars() {
  const ctx = document.getElementById('totalsChart').getContext('2d');
  const data = window.data;

  const totals = {};

  const allCountries = [...new Set(data.map(x => x.CountryExp))];

  allCountries.forEach(countryName => {
    totals[countryName] = data
      .filter(y => y.CountryExp == countryName)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b);
  });

  const countriesWithTotals = Object.keys(totals).map(key => ({ countryName: key, total: totals[key] }));

  const sortedByTotalCases = countriesWithTotals.sort((a, b) => b.total - a.total).slice(0, 10);

  const labels = [...new Set(sortedByTotalCases.map(x => x.countryName))];
  const values = sortedByTotalCases.map(x => x.total);

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
      animation: {
        duration: 0
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: formatThousandsAsK
            }
          }
        ]
      }
    }
  });
}

function drawCountryActiveCases(countryName) {
  const ctx = document.getElementById('countryActiveCases').getContext('2d');
  const data = window.data;

  const labels = dayStringsSinceStartOfYear;
  const localizedLabels = labels.map(x => moment(x, 'MM/DD/YYYY').format(defaultDateFormat));

  const firstCountryInfections = labels.map(x =>
    data
      .filter(y => y.DateRep == x && y.CountryExp == countryName)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b, 0)
  );
  const summedFirstCountryInfections = firstCountryInfections.map((x, i, a) => {
    const totalSoFar = firstCountryInfections.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });
  const firstCountryRecoveries = labels.map(x =>
    data
      .filter(y => y.DateRep == x && y.CountryExp == countryName)
      .map(x => x.Recoveries)
      .reduce((a, b) => +a + +b, 0)
  );
  const summedFirstCountryRecoveries = firstCountryRecoveries.map((x, i, a) => {
    const totalSoFar = firstCountryRecoveries.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });
  const firstCountryDeaths = labels.map(x =>
    data
      .filter(y => y.DateRep == x && y.CountryExp == countryName)
      .map(x => x.Deaths)
      .reduce((a, b) => +a + +b, 0)
  );
  const summedFirstCountryDeaths = firstCountryDeaths.map((x, i, a) => {
    const totalSoFar = firstCountryDeaths.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const values = summedFirstCountryInfections.map(
    (x, i) => x - (summedFirstCountryRecoveries[i] + summedFirstCountryDeaths[i])
  );

  const filterFunction = (x, i, a) => {
    if (i < (countryName == 'China' ? 30 : 50)) {
      return false;
    }

    const distanceFromPresent = a.length - i;

    const volumeToShow = isMobile ? 6 : 16;

    const rarifyingFactor = Math.floor(distanceFromPresent / volumeToShow) + 1;

    return i % rarifyingFactor == 0;
  };

  countryActiveCases = new Chart(ctx, {
    type: 'line',
    data: {
      labels: localizedLabels.filter(filterFunction),
      datasets: [
        {
          label: 'Cazuri active - ' + countryName,
          data: values.filter(filterFunction),
          backgroundColor: '#5b9bd522',
          borderColor: '#5b9bd5',
          borderWidth: 2
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000',
              beginAtZero: true,
              callback: formatThousandsAsK
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 15,
          top: 0,
          bottom: 0
        }
      }
    }
  });
}

function drawGlobalActiveCases() {
  const ctx = document.getElementById('globalActiveCases').getContext('2d');
  const data = window.data;

  const labels = dayStringsSinceStartOfYear;
  const localizedLabels = labels.map(x => moment(x, 'MM/DD/YYYY').format(defaultDateFormat));

  const topCountries = ['China', 'USA', 'Italy', 'Spain'];

  const datasets = [];
  topCountries.forEach(countryName => {
    const thisCountryData = data.filter(y => y.CountryExp == countryName);

    const activeCases = labels.map(x => {
      const { Cases, Recoveries, Deaths } = thisCountryData.find(y => y.DateRep == x);

      return +Cases - (+Recoveries + +Deaths);
    });

    const summedActiveCases = activeCases.map((x, i, a) => {
      const totalSoFar = a.slice(0, i).reduce((a, b) => a + b, 0);
      return totalSoFar + x;
    });

    datasets.push(summedActiveCases);
  });

  const filterFunction = (_, i, a) => {
    if (i < (isMobile ? 30 : 30)) {
      return false;
    }

    if (i > a.length - 5) {
      return true;
    }

    return i % (isMobile ? 8 : 2) == 0 || i == a.length - 1;
  };

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: localizedLabels.filter(filterFunction),
      datasets: [
        {
          label: topCountries[0],
          data: datasets[0].filter(filterFunction),
          backgroundColor: '#F4433600',
          borderColor: '#5b9bd5',
          borderWidth: 2
        },
        {
          label: topCountries[1],
          data: datasets[1].filter(filterFunction),
          backgroundColor: '#F4433600',
          borderColor: '#ffc001',
          borderWidth: 2
        },
        {
          label: topCountries[2],
          data: datasets[2].filter(filterFunction),
          backgroundColor: '#F4433600',
          borderColor: '#ed7d31',
          borderWidth: 2
        },
        {
          label: topCountries[3],
          data: datasets[3].filter(filterFunction),
          backgroundColor: '#F4433600',
          borderColor: '#9C27B0',
          borderWidth: 2
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      minValueForLabel: 250,
      labelsToIgnore: ['8166', '2127', '6935', '14k', '1144', '1910', '416'],
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000',
              beginAtZero: true,
              callback: formatThousandsAsK
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 15,
          top: 0,
          bottom: 0
        }
      }
    }
  });
}

function drawLastWeekTotalsBars() {
  const ctx = document.getElementById('lastWeekTotals').getContext('2d');
  const data = window.data.filter(x => +new Date() - +new Date(x.DateRep) < 7 * 24 * 60 * 60 * 1000);

  const totals = {};

  const allCountries = [...new Set(data.map(x => x.CountryExp))];

  allCountries.forEach(countryName => {
    totals[countryName] = data
      .filter(y => y.CountryExp == countryName)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b);
  });

  const countriesWithTotals = Object.keys(totals).map(key => ({ countryName: key, total: totals[key] }));

  const sortedByTotalCases = countriesWithTotals.sort((a, b) => b.total - a.total).slice(0, 10);

  const labels = [...new Set(sortedByTotalCases.map(x => x.countryName))];
  const values = sortedByTotalCases.map(x => x.total);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Confirmed cases in the last 7 days',
          data: values,
          backgroundColor: '#9c27b022',
          borderColor: '#9c27b0',
          borderWidth: 1
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: formatThousandsAsK
            }
          }
        ]
      }
    }
  });
}

function drawTotalsForCountry(chartId, countryName, color = '#ff9800') {
  const ctx = document.getElementById(chartId).getContext('2d');
  const data = window.data;

  const localizedLabels = dayStringsSinceStartOfYear.map(x => moment(x, 'MM/DD/YYYY').format(defaultDateFormat));
  const values = dayStringsSinceStartOfYear.map(x =>
    data
      .filter(y => y.DateRep == x && y.CountryExp == countryName)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b, 0)
  );
  const deaths = dayStringsSinceStartOfYear.map(x =>
    data
      .filter(y => y.DateRep == x && y.CountryExp == countryName)
      .map(x => x.Deaths)
      .reduce((a, b) => +a + +b, 0)
  );
  const recoveries = dayStringsSinceStartOfYear.map(x =>
    data
      .filter(y => y.DateRep == x && y.CountryExp == countryName)
      .map(x => x.Recoveries)
      .reduce((a, b) => +a + +b, 0)
  );

  const summedDailyValues = values.map((x, i, a) => {
    const totalSoFar = values.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const summedDailyDeaths = deaths.map((x, i, a) => {
    const totalSoFar = deaths.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const summedDailyRecoveries = recoveries.map((x, i, a) => {
    const totalSoFar = recoveries.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const filterFunction = (x, i, a) => {
    if (i < a.length - (isMobile ? 30 : 40)) {
      return false;
    }

    const distanceFromPresent = a.length - i;

    const volumeToShow = isMobile ? 7 : 16;

    const rarifyingFactor = Math.floor(distanceFromPresent / volumeToShow) + 1;

    return i % rarifyingFactor == 0;
  };

  otherCountryChartTotals = new Chart(ctx, {
    type: 'line',
    data: {
      labels: localizedLabels.filter(filterFunction),
      datasets: [
        {
          label: 'Infectari - ' + countryName,
          data: summedDailyValues.filter(filterFunction),
          backgroundColor: color + '22',
          borderColor: color,
          borderWidth: 1
        },
        {
          label: 'Vindecari - ' + countryName,
          data: summedDailyRecoveries.filter(filterFunction),
          backgroundColor: '#4CAF5022',
          borderColor: '#4CAF50',
          borderWidth: 1
        },
        {
          label: 'Morti - ' + countryName,
          data: summedDailyDeaths.filter(filterFunction),
          backgroundColor: '#E91E6322',
          borderColor: '#E91E63',
          borderWidth: 1
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000',
              beginAtZero: true,
              callback: formatThousandsAsK
            }
          }
        ]
      },
      layout: {
        padding: {
          right: 10
        }
      }
    }
  });
}

function drawGlobalTotals() {
  const ctx = document.getElementById('globalTotals').getContext('2d');
  const data = window.data;

  const labels = dayStringsSinceStartOfYear;
  const localizedLabels = labels.map(x => moment(x, 'MM/DD/YYYY').format(defaultDateFormat));
  const values = labels.map(x =>
    data
      .filter(y => y.DateRep == x)
      .map(x => x.Cases)
      .reduce((a, b) => +a + +b, 0)
  );
  const deaths = labels.map(x =>
    data
      .filter(y => y.DateRep == x)
      .map(x => x.Deaths)
      .reduce((a, b) => +a + +b, 0)
  );
  const recoveries = labels.map(x =>
    data
      .filter(y => y.DateRep == x)
      .map(x => x.Recoveries)
      .reduce((a, b) => +a + +b, 0)
  );

  const summedDailyValues = values.map((x, i, a) => {
    const totalSoFar = values.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const summedDailyDeaths = deaths.map((x, i, a) => {
    const totalSoFar = deaths.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const summedDailyRecoveries = recoveries.map((x, i, a) => {
    const totalSoFar = recoveries.slice(0, i).reduce((a, b) => a + b, 0);
    return totalSoFar + x;
  });

  const filterFunction = (_, i, a) => {
    const distanceFromPresent = a.length - i;

    const volumeToShow = isMobile ? 6 : 16;

    const rarifyingFactor = Math.floor(distanceFromPresent / volumeToShow) + 1;

    return i % rarifyingFactor == 0;
  };

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: localizedLabels.filter(filterFunction),
      datasets: [
        {
          label: 'Infectari - toata lumea',
          data: summedDailyValues.filter(filterFunction),
          backgroundColor: '#ff980022',
          borderColor: '#ff9800',
          borderWidth: 1
        },
        {
          label: 'Vindecari - toata lumea',
          data: summedDailyRecoveries.filter(filterFunction),
          backgroundColor: '#4CAF5022',
          borderColor: '#4CAF50',
          borderWidth: 1
        },
        {
          label: 'Morti - toata lumea',
          data: summedDailyDeaths.filter(filterFunction),
          backgroundColor: '#E91E6322',
          borderColor: '#E91E63',
          borderWidth: 1
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000',
              beginAtZero: true,
              callback: formatThousandsAsK
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 15,
          top: 0,
          bottom: 0
        }
      }
    }
  });
}

function maybeAddEntryForRomaniaToday() {
  const romaniaEntries = window.data.filter(x => x['Countries and territories'] == 'Romania');
  const todayString = moment().format('MM/DD/YYYY');
  if (!romaniaEntries.find(x => x.DateRep == todayString)) {
    const currentHour = moment().format('HH');
    if (currentHour > 12) {
      window.data = [
        ...window.data,
        { 'Countries and territories': 'Romania', DateRep: todayString, Deaths: 0, Recoveries: 0, Cases: 0 }
      ];
    }
  }
}

const recoveriesCountriesMap = {
  'Korea, South': 'southkorea',
  US: 'USA'
};

const recoveries = {};

function populateRecoveriesObject() {
  const allCountries = [...new Set(window.recoveredData.map(x => x['Country/Region']))];
  const allDates = Object.keys(window.recoveredData[0]).filter(x => x.includes('/20'));

  allDates.forEach((date, i) => {
    const casesForAllCountriesForCurrentDate = {};
    allCountries.forEach(recoveredCountryName => {
      if (recoveredCountryName == 'Korea, South') {
        debugger;
      }
      casesForAllCountriesForCurrentDate[
        recoveriesCountriesMap[recoveredCountryName] || recoveredCountryName.replace(/[\s\_]/g, '').toLowerCase()
      ] = window.recoveredData
        .filter(x => x['Country/Region'] == recoveredCountryName)
        .map(x => x[date])
        .reduce((a, b) => a + b, 0);
    });

    recoveries[date] = casesForAllCountriesForCurrentDate;
  });
}

function getRecoveriesForToday(countryName, dateRep) {
  const yesterdaysKey = moment(dateRep, 'MM/DD/YYYY')
    .subtract(1, 'day')
    .format('M/D/YY');
  const todaysKey = moment(dateRep, 'MM/DD/YYYY').format('M/D/YY');

  const todaysRecoveries = recoveries[todaysKey]?.[countryName] || 0;
  const yesterdaysRecoveries = recoveries[yesterdaysKey]?.[countryName] || 0;

  return todaysRecoveries ? todaysRecoveries - yesterdaysRecoveries : 0;
}

function cleanupData() {
  maybeAddEntryForRomaniaToday();

  populateRecoveriesObject();

  window.data = window.data.map(x => {
    let countryName = x['Countries and territories'].replace(/\_/g, ' ');
    if (countryName.toLowerCase().startsWith('united states of amer')) {
      countryName = 'USA';
    }
    if (countryName.startsWith('Cases')) {
      countryName = 'Diamond Princess';
    }
    if (countryName.toLowerCase().startsWith('canada')) {
      countryName = 'Canada';
    }

    x.Recoveries = getRecoveriesForToday(countryName.replace(/[\s\_]/g, '').toLowerCase(), x.DateRep);

    if (countryName == 'Romania') {
      x = { ...x, ...window.romaniaData[x.DateRep] };
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

  drawDailyCasesChart('otherCountryChart', picker.value, '#ffeb3b');
}

function drawComparedCountryTotalCases(picker) {
  otherCountryChartTotals.destroy();
  drawTotalsForCountry('otherCountryTotals', picker.value, '#ffeb3b');
}

function drawComparedActiveCases(picker) {
  countryActiveCases.destroy();
  drawCountryActiveCases(picker.value);
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
    picker.value = picker.id == 'activeCasesCountryPicker' ? 'Romania' : 'Italy';
  });
}

function setupBarLabels() {
  Chart.pluginService.register({
    afterDraw: function(chartInstance) {
      var ctx = chartInstance.chart.ctx;

      ctx.font = Chart.helpers.fontString(
        Chart.defaults.global.defaultFontSize,
        'normal',
        Chart.defaults.global.defaultFontFamily
      );
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = '#000';

      const { minValueForLabel = 0, labelsToIgnore = [] } = chartInstance.options;

      chartInstance.data.datasets.forEach(dataset => {
        for (var i = 0; i < dataset.data.length; i++) {
          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
          const currentValue = dataset.data[i];
          let formattedValue = currentValue > 9999 ? Math.floor(dataset.data[i] / 1000) + 'k' : dataset.data[i] + '';

          if (isMobile) {
            const thousands = (currentValue / 1000).toFixed(1);
            const endsWithZero = thousands.endsWith('.0');
            const thousandsWithoutZero = (dataset.data[i] / 1000).toFixed(endsWithZero ? 0 : 1);

            formattedValue = formattedValue > 999 ? thousandsWithoutZero + 'k' : formattedValue;
          }

          if (currentValue > minValueForLabel && !labelsToIgnore.includes(formattedValue)) {
            ctx.fillText(formattedValue, model.x, model.y - 2);
          }
        }
      });
    }
  });
}

function show(graphId, button) {
  document.querySelectorAll('button').forEach(x => {
    x.removeAttribute('selected');
  });
  document.querySelectorAll('.graph-wrapper').forEach(x => {
    x.removeAttribute('visible');
  });

  button.toggleAttribute('selected');

  const wrapper = document.getElementById(graphId);
  wrapper.toggleAttribute('visible');
}

let dayStringsSinceStartOfYear = [];

function populateLabelsSinceStartOfYear() {
  dayStringsSinceStartOfYear = [
    ...new Set(window.data.filter(x => x['Countries and territories'] == 'China').map(x => x.DateRep))
  ].sort((a, b) => moment(a, 'MM/DD/YYYY') - moment(b, 'MM/DD/YYYY'));
}

setCurrentDate();
draw();
