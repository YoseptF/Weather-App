import './sass/style.scss';
import 'regenerator-runtime';
import 'animate.css';

async function getCountriesModule() {
  const { default: createForm } = await require(/* webpackChunkName: "countries" */ './packages/countries'); // eslint-disable-line global-require

  createForm();
}

window.onload = () => {
  document.querySelector('.container').innerHTML += `
<div class="initial">
  <a href="https://github.com/YoseptF/Weather-App" target="_blank"><i class="fab fa-github secondary-icon animated bounce"></i></a>
  <i class="fas fa-cloud-sun-rain getWeather main-icon animated bounce"></i>
  <a href="https://github.com/hiiamrohit/Countries-States-Cities-database" target="_blank"><i class="fas fa-globe-americas secondary-icon animated bounce"></i></a>
</div>
`;


  const initiateCountries = () => getCountriesModule();


  document.querySelector('.getWeather').addEventListener('click', initiateCountries);
};
