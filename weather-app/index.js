const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '0bcf4d19aa635b2a89ea1da0d8f9d2c8';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const min_temp = document.querySelector('.weather-box .min-maxtemp .mintemp ')
            const max_temp = document.querySelector('.weather-box .min-maxtemp .maxtemp')
            const feel_like = document.querySelector('.weather-box .feel-like')
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'img/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed}Km/h`;
            min_temp.innerHTML = `min: ${parseInt(json.main.temp_min)}°C`;
            max_temp.innerHTML = `max: ${parseInt(json.main.temp_max)}°C`;
            feel_like.innerHTML = `feel like: ${parseInt(json.main.feels_like)}°C`;


            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '610px';

            const timezone = json.timezone; 
            const now = new Date();
            const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
            const offsetTime = new Date(utcTime + timezone * 1000);
            const hours = offsetTime.getHours().toString().padStart(2, '0');
            const minutes = offsetTime.getMinutes().toString().padStart(2, '0');
            const seconds = offsetTime.getSeconds().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;
            const time = document.querySelector('.time');
            time.innerHTML = `Local Time ${timeString}`;
        });

        

});
