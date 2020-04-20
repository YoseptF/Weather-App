// import csc from 'country-state-city-plus';
import csc from 'country-state-city-plus';
import { getWeather, Units } from './weather';
import {
  DOMcreateForm, DOMListener, DOMGet, DOMSet, DOMPlus, DOMGetAll,
} from './domManipulation';

let city;
let country;
let units;

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

const updateSelection = (selector, updateable, nextSelector, nextFunction, next = null) => {
  let id;
  const updateSelectioEvent = event => {
    const toUpdate = DOMGet(updateable);
    if (event.target.dataset.value || event.target.parentNode.dataset.value) {
      if (event.target.nodeName === 'SPAN') {
        toUpdate.innerHTML = event.target.parentNode.innerHTML;
        id = event.target.parentNode.dataset.value;
      } else if (event.target.nodeName === 'DT') {
        toUpdate.innerHTML = event.target.innerHTML;
        id = event.target.dataset.value;
      }
      if (selector === '.city-select') {
        city = DOMGet('.city-default span', 'innerHTML');
        units = DOMGet('.units-switch:checked', 'value');
        getWeather(city, country, units);
      }
      if (selector === '.country-select') {
        const cc = csc.getCountryByName(DOMGet('.country-default span', 'innerHTML').replace(' ', '')).sortname;
        country = cc;
      }
    }
    if (next) {
      DOMSet(nextSelector, 'innerHTML', nextFunction(id));
    }
  };
  DOMListener(selector, 'click', e => updateSelectioEvent(e));
  if (next) {
    next();
  }
};

const createForm = () => {
  DOMcreateForm(countryOptions);
  DOMPlus('.container', 'innerHTML', Units);
  const selectors = DOMGetAll('.country-select, .state-select, .city-select');
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
  const listenUnits = event => {
    if (DOMGet('.city-default', 'innerHTML') !== 'Select a city...'
      && !event.target.previousElementSibling.checked) {
      getWeather(city, country, event.target.previousElementSibling.value);
    }
  };
  DOMGetAll('.units-label').forEach(label => {
    DOMListener(label, 'click', e => listenUnits(e));
  });
};

export default createForm;