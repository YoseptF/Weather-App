
const Units = () => `
  <div class="units-wrapper">
  <input class="units-switch" name="units" type="radio" id="metric" value="metric" checked></input>
  <label class="units-label" for="metric">C°</label>
  <input class="units-switch" name="units" type="radio" id="imperial" value="imperial"></input>
  <label class="units-label" for="imperial">F°</label>
  </div>
  `;

const getWeather = (city, country, units) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.WEATHER_API}&units=${units}`;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  document.querySelector('.weather').innerHTML = `
  <i class="fas fa-spinner fa-spin"></i>
  `;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      fetch(`https://source.unsplash.com/featured/?${result.weather[0].main}`)
        .then(response => response.blob())
        .then(blob => {
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
        });
    })
    .catch(() => {
      document.querySelector('.weather').innerHTML = `
      <h3>Your city does not apper to be in the database</h3>
      <h5>You can ask it to be added <a href="https://github.com/hiiamrohit/Countries-States-Cities-database/issues">here</a></h5>
      `;
    });
};

export { getWeather, Units };