console.log('Client side javascript loaded');

window.addEventListener('DOMContentLoaded', () => {
  const weatherForm = document.querySelector('#weather-form');
  weatherForm.addEventListener('submit', weatherFormSubmitHandler);
});

function weatherFormSubmitHandler(event) {
  event.preventDefault();
  const location = document.querySelector('.address');
  const displayData = document.querySelector('#display-data');
  const climate = document.querySelector('.climate');
  const temp = document.querySelector('.temp');
  const place = document.querySelector('.place');
  const loader = document.querySelector('.loader');
  displayData.classList.remove('show');
  loader.classList.add('show');
  displayData.classList.add('hide');
  if (location.value == '') {
    document.querySelector('.error').innerHTML = 'Please enter some location';
  } else {
    const url = 'http://localhost:3000/weather?address=' + location.value;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        loader.classList.remove('show');
        loader.classList.add('hide');
        displayData.classList.remove('hide');
        climate.innerHTML = data.forecast.weather;
        temp.innerHTML = data.forecast.temparture;
        place.innerHTML = data.location;
        displayData.classList.add('show');
      });
  }
}
