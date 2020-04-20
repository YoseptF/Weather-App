import './sass/style.scss';
import 'regenerator-runtime'; // eslint-disable-line import/no-unresolved
import 'animate.css'; // eslint-disable-line import/no-unresolved
import { createContainer, DOMListener } from './packages/domManipulation';

async function getCountriesModule() {
  const { default: createForm } = await require(/* webpackChunkName: "countries" */ './packages/countries'); // eslint-disable-line global-require

  createForm();
}

window.onload = () => {
  createContainer();
  const initiateCountries = () => getCountriesModule();
  DOMListener('.getWeather', 'click', initiateCountries);
};
