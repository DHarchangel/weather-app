
let search = document.getElementById('search-input');
let cityName = document.querySelector('.city-name');
let searchButton = document.querySelector('.search-btn');
let currentLocation = document.querySelector('.location');

searchButton.addEventListener('click', searchCity);

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

function searchCity(event) {
    event.preventDefault();


    if (search.value.length > 0) {
        cityName.innerHTML = search.value;
    }
    let apiKey = '9e0fb79c2f66d0cd0dcf06710976a873';
    let city = search.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

    axios.get(`${apiUrl}&appid=${apiKey}`)
        .then(showTemperature);
}



let temperature = document.querySelector('.temperature');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let climate = document.querySelector('.climate');
let image = document.querySelector('.image');
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (days < 10) { days = `0${days}`; }
    let minutes = date.getMinutes();
    if (minutes < 10) { minutes = `0${minutes}`; }
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = date.getDate();
    return `${days[day]} ${hours}:${minutes}`;
}

function showTemperature(response) {
    let temperature = document.querySelector('.temperature');
    let humidity = document.querySelector('.humidity');
    let wind = document.querySelector('.wind');
    let climate = document.querySelector('.climate');
    let image = document.querySelector('.image');
    let dateElement = document.querySelector('#date');

    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = Math.round(response.data.main.humidity);
    wind.innerHTML = response.data.wind.speed;
    climate.innerHTML = response.data.weather[0].main;
    let imageSrc = response.data.weather[0].icon;
    image.src = `http://openweathermap.org/img/wn/${imageSrc}@2x.png`;

}


//{city name},{state code},{country code}&appid={API key}