import './sass/style.scss';
import 'regenerator-runtime';

async function getCountriesModule() {
  const { default: createForm } = await require(/* webpackChunkName: "countries" */ './packages/countries'); // eslint-disable-line global-require

  createForm();
}

document.querySelector('.container').innerHTML = `
<button class="getWeather">Get the weather</button>
`;


const initiateCountries = () => getCountriesModule();


document.querySelector('.getWeather').addEventListener('click', initiateCountries);
