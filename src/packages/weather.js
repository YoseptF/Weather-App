import {
  setSpiner, backgroundInOut, DOMUnits, cityNotFound,
} from './domManipulation';

const Units = DOMUnits;

const getWeather = (city, country, units) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.WEATHER_API}&units=${units}`;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  setSpiner();

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      fetch(`https://source.unsplash.com/featured/?${result.weather[0].main}`)
        .then(response => response.blob())
        .then(blob => backgroundInOut(blob, result, units));
    })
    .catch(() => {
      cityNotFound();
    });
};

export { getWeather, Units };