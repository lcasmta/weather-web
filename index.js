const container = document.querySelector('.container');
const getlocButton = document.querySelector('.getlocButton');
const search = document.querySelector('.searchbtn ');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function getWeather() {
    const apiKey = 'e85215f617526a50273d528663abc379';
    const city = document.querySelector('.search-box input').value;


    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(response => response.json()).then(json => {
        console.log(json);

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

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'img/clear.png';
                break;
            case 'Clouds':
                image.src = 'img/cloud.png';
                break;
            case 'Mist':
                image.src = 'img/mist.png';
                break;
            case 'Rain':
                image.src = 'img/rain.png';
                break;
            case 'Snow':
                image.src = 'img/snow.png';
                break;

        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;

        description.innerHTML = `${json.weather[0].description}`;

        humidity.innerHTML = `${json.main.humidity}%`;

        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';

        weatherDetails.style.display = '';

        weatherBox.classList.add('fadeIn');

        weatherDetails.classList.add('fadeIn');

        container.style.height = '590px';


    });
}

function getLocation() {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(function (position) {
            // The user's latitude and longitude are in position.coords.latitude and position.coords.longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            const apiKey = 'e85215f617526a50273d528663abc379';
            let city = document.getElementById('city');

            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`).then(response => response.json()).then(json => {
                console.log(json);

                city.value = `${json[0].name}`;
                console.log(city);

                if (city) getWeather();

            });
        }, function (error) {
            // Handle errors, if any
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("User denied the request for geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.error("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.error("An unknown error occurred.");
                    break;


            }
        });
    } else {
        console.error("Geolocation is not available in this browser.");
    }
}