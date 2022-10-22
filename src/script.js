
let searchButton = document.querySelector('.search-btn');
let currentLocation = document.querySelector('.location');

/*
// Used to find current location of the user
currentLocation.addEventListener('click', findLocation);
function findLocation() {
    navigator.geolocation.getCurrentPosition(showposition);
}

function showposition(position) {
    let li = document.querySelector('.position');
    li.innerHTML = `Latitude: ${Math.round(position.coords.latitude)}, Longitude: ${Math.round(position.coords.longitude)}`;
    
}
*/

let search = document.getElementById('search-input');
let temperature = document.querySelector('.temperature');
let celciusTemp = null;

function searchCity(city) {
    let apiKey = '9e0fb79c2f66d0cd0dcf06710976a873';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

    axios.get(`${apiUrl}&appid=${apiKey}`)
        .then(showTemperature);
}
    function handleSubmit(event) {
        event.preventDefault();
        searchCity(search.value);


    }

    function formatDate(timestamp) {
        let date = new Date(timestamp);
        let hours = date.getHours();
        if (hours < 10) { hours = `0${hours}`; }
        let minutes = date.getMinutes();
        if (minutes < 10) { minutes = `0${minutes}`; }
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[date.getDay()];
        return `${day} ${hours}:${minutes}`;
    }

    function showFahrenheitTemp(event) {
        event.preventDefault();
        let temperature = document.querySelector('.temperature');
        temperature.innerHTML =
            fahrenheit(celciusTemp);

    }
    function fahrenheit(temp) {
        return Math.round((temp * 9 / 5) + 32);
    }

    function showCelciusTemp() {
        temperature.innerHTML = Math.round(celciusTemp);
    }

    function showTemperature(response) {
        let humidity = document.querySelector('.humidity');
        let wind = document.querySelector('.wind');
        let climate = document.querySelector('.climate');
        let image = document.querySelector('.image');
        let dateElement = document.querySelector('#date');
        let cityName = document.querySelector('.city-name');



        if (search.value.length > 0) {
            cityName.innerHTML = search.value;
        }
        dateElement.innerHTML = formatDate(response.data.dt * 1000);
        celciusTemp = response.data.main.temp;
        temperature.innerHTML = Math.round(celciusTemp);
        humidity.innerHTML = Math.round(response.data.main.humidity);
        wind.innerHTML = response.data.wind.speed;
        climate.innerHTML = response.data.weather[0].main;
        let imageSrc = response.data.weather[0].icon;
        image.src = `http://openweathermap.org/img/wn/${imageSrc}@2x.png`;
    }

    let form = document.querySelector('#search-form');
    form.addEventListener('submit', handleSubmit);

    let fahrenheitLink = document.querySelector('#fahrenheit-link');
    let celciusLink = document.querySelector('#celsius-link');
    fahrenheitLink.addEventListener('click', showFahrenheitTemp);
    celciusLink.addEventListener('click', showCelciusTemp);

