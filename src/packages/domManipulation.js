const createContainer = () => {
  document.querySelector('.container').innerHTML += `
  <div class="initial">
    <a href="https://github.com/YoseptF/Weather-App" target="_blank"><i class="fab fa-github secondary-icon animated bounce"></i></a>
    <i class="fas fa-cloud-sun-rain getWeather main-icon animated bounce"></i>
    <a href="https://github.com/hiiamrohit/Countries-States-Cities-database" target="_blank"><i class="fas fa-globe-americas secondary-icon animated bounce"></i></a>
  </div>
  `;
};

const DOMGet = (selector, value = null) => {
  if (value === 'innerHTML') return document.querySelector(selector).innerHTML;
  if (value === 'value') return document.querySelector(selector).value;

  return document.querySelector(selector);
};
const DOMGetAll = (selector, value = null) => {
  if (value === 'innerHTML') return document.querySelectorAll(selector).innerHTML;
  if (value === 'value') return document.querySelectorAll(selector).value;

  return document.querySelectorAll(selector);
};

const DOMSet = (selector, value = null, newValue) => {
  if (value === 'innerHTML') document.querySelector(selector).innerHTML = newValue;
  if (value === 'value') document.querySelector(selector).innerHTML.value = newValue;
};

const DOMPlus = (selector, value = null, newValue) => {
  if (value === 'innerHTML') document.querySelector(selector).innerHTML += newValue;
  if (value === 'value') document.querySelector(selector).innerHTML.value += newValue;
};


const DOMListener = (selector, event, action) => {
  if (typeof selector !== 'string') selector.addEventListener(event, action);
  else document.querySelector(selector).addEventListener(event, action);
};

const mapForm = (countryOptions) => `
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

const DOMcreateForm = (countryOptions) => {
  document.querySelector('.container').innerHTML = mapForm(countryOptions);
};

const setSpiner = () => {
  document.querySelector('.weather').innerHTML = `
  <i class="fas fa-spinner fa-spin"></i>
  `;
};

const backgroundInOut = (blob, result, units) => {
  const theBackground = document.querySelector('.background');
  theBackground.classList.add('changeIn');
  setTimeout(() => {
    document.querySelector('.weather').innerHTML = `
      <h1>${result.name}, ${result.sys.country}</h1>
      <h2 class="description">${result.weather[0].description}</h2>
      <h2 class="temp">${result.main.temp} ${units === 'metric' ? 'C°' : 'F°'}</h2>
      <img src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png">
    `;
    theBackground.style.background = `url("${URL.createObjectURL(blob)}") center/cover`;
    theBackground.classList.add('changeOut');
    setTimeout(() => {
      theBackground.classList.remove('changeIn');
      theBackground.classList.remove('changeOut');
    }, 750);
  }, 750);
};

const DOMUnits = `
<div class="units-wrapper">
<input class="units-switch" name="units" type="radio" id="metric" value="metric" checked></input>
<label class="units-label" for="metric">C°</label>
<input class="units-switch" name="units" type="radio" id="imperial" value="imperial"></input>
<label class="units-label" for="imperial">F°</label>
</div>
`;

const cityNotFound = () => {
  document.querySelector('.weather').innerHTML = `
  <h3>Your city does not apper to be in the database</h3>
  <h5>You can ask it to be added <a href="https://github.com/hiiamrohit/Countries-States-Cities-database/issues">here</a></h5>
  `;
};

export {
  DOMListener, createContainer, DOMcreateForm, DOMGet, DOMSet, DOMPlus, DOMGetAll, setSpiner, backgroundInOut, DOMUnits, cityNotFound,
};