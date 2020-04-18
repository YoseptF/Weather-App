
const getWeather = (city) => {
  console.log(process.env.WEATHER_API);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}`;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      document.querySelector('.weather').innerHTML = `
      <h1>${result.name}, ${result.sys.country}</h1>
      <h2 class="description">${result.weather[0].description}</h2>
      `;
      fetch(`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`)
        .then(response => response.blob())
        .then(blob => {
          document.querySelector('.weather .description').innerHTML += ` <img src="${URL.createObjectURL(blob)}">`;
        });
    })
    .catch(error => console.log('error', error));
};

export default getWeather;