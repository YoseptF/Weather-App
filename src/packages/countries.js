// import csc from 'country-state-city-plus';
import csc from 'country-state-city-plus';
import getWeather from './weather';

document.querySelector('.container').innerHTML = `
<button class="getWeather">Get the weather</button>
`;

let city;
let country;

const countryOptions = () => {
  const countries = csc.getAllCountries();
  const mappedCountries = countries.filter(countryUnfiltered => (
    countryUnfiltered.sortname !== 'TP'
      && countryUnfiltered.sortname !== 'XA'
      && countryUnfiltered.sortname !== 'XU'
      && countryUnfiltered.sortname !== 'XJ'
      && countryUnfiltered.sortname !== 'XM'
      && countryUnfiltered.sortname !== 'XG'
      && countryUnfiltered.sortname !== 'YU')).map(country => {
    const elem = `
    <dt class="country" data-value="${country.id}">
      <img loading="lazy" src="https://www.countryflags.io/${country.sortname.toLowerCase()}/flat/64.png">&nbsp
      <span> ${country.name}</span>
    </dt>
    `;
    return elem;
  });

  return mappedCountries.join('');
};

const stateOptions = (id) => {
  const states = csc.getStatesOfCountry(id);
  const mappedStates = states.map(state => `
    <dt data-value="${state.id}">
      <span>${state.name}</span>
    </dt>
  `);

  return mappedStates.join('');
};

const cityOptions = (id) => {
  const cities = csc.getCitiesOfState(id);
  const mappedCities = cities.map(city => `
    <dt data-value="${city.id}">
      <span>${city.name}</span>
    </dt>
  `);

  return mappedCities.join('');
};

const mapForm = `
<div class="background"></div>
<div class="app">
  <dl class="country-select">
  <dt class="default"><span class="country-default">Select a country...</span> <i class="fas fa-sort-down"></i></dt>
  <div class="options">
  ${countryOptions()}
  </div>
  </dl>
  <dl class="state-select">
  <dt class="default"><span class="state-default">Select a state...</span> <i class="fas fa-sort-down"></i></dt>
  <div class="options">
  </div>
  </dl>
  <dl class="city-select">
  <dt class="default"><span class="city-default">Select a city...</span> <i class="fas fa-sort-down"></i></dt>
  <div class="options">
  </div>
  </dl>
  <div class="weather"></div>
</div>
`;

const updateSelection = (selector, updateable, nextSelector, nextFunction, next = null) => {
  let id;
  document.querySelector(selector).addEventListener('click', event => {
    const toUpdate = document.querySelector(updateable);
    if (event.target.dataset.value || event.target.parentNode.dataset.value) {
      if (event.target.nodeName === 'SPAN') {
        toUpdate.innerHTML = event.target.parentNode.innerHTML;
        id = event.target.parentNode.dataset.value;
      } else if (event.target.nodeName === 'DT') {
        toUpdate.innerHTML = event.target.innerHTML;
        id = event.target.dataset.value;
      }
      if (selector === '.city-select') {
        city = document.querySelector('.city-default span').innerHTML;
        getWeather(city, country);
      }
      if (selector === '.country-select') {
        const cc = csc.getCountryByName(document.querySelector('.country-default span').innerHTML.replace(' ', '')).sortname;
        console.log('cc: ', cc);
        country = cc;
      }
    }
    if (next) {
      document.querySelector(nextSelector).innerHTML = nextFunction(id);
    }
  });
  if (next) {
    next();
  }
};

const createForm = () => {
  document.querySelector('.container').innerHTML = mapForm;
  const selectors = document.querySelectorAll('.country-select, .state-select, .city-select');
  selectors.forEach(selector => {
    selector.addEventListener('click', () => {
      selectors.forEach(select => {
        if (select !== selector) select.lastElementChild.style.display = 'none';
      });
      const now = selector.lastElementChild.style.display;
      selector.lastElementChild.style.display = now === 'block' ? 'none' : 'block';
    });
  });
  updateSelection(
    '.country-select',
    '.country-default',
    '.state-select .options',
    (id) => stateOptions(id),
    () => updateSelection(
      '.state-select',
      '.state-default',
      '.city-select .options',
      (id) => cityOptions(id),
      () => updateSelection(
        '.city-select',
        '.city-default',
      ),
    ),
  );
};

export default createForm;