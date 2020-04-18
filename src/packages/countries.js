import csc from 'country-state-city-plus';
import 'flag-icon-css/css/flag-icon.min.css';

let city;

const countryOptions = () => {
  const countries = csc.getAllCountries();
  const mappedCountries = countries.map(country => `
  <dt data-value="${country.id}">
    <span class="flag-icon flag-icon-${country.sortname.toLowerCase()}"></span>
    <span>${country.name}</span>
  </dt>
  `);
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
<dl class="contry-select">
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
      if (selector == '.city-select') {
        city = document.querySelector('.city-default span').innerHTML;
        console.log(city);
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
  const selectors = document.querySelectorAll('.contry-select, .state-select, .city-select');
  selectors.forEach(selector => {
    selector.addEventListener('click', () => {
      selectors.forEach(select => {
        if (select != selector)select.lastElementChild.style.display = 'none';
      });
      const now = selector.lastElementChild.style.display;
      selector.lastElementChild.style.display = now === 'block' ? 'none' : 'block';
    });
  });
  updateSelection(
    '.contry-select',
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