/*
let weather = {
    paris: {
        temp: 19.7,
        humidity: 80
    },
    tokyo: {
        temp: 17.3,
        humidity: 50
    },
    lisbon: {
        temp: 30.2,
        humidity: 20
    },
    "san francisco": {
        temp: 20.9,
        humidity: 100
    },
    oslo: {
        temp: -5,
        humidity: 20
    }
};



// write your code here

let city = prompt('Enter a City');
let fahrenheit;
if (city === 'paris') {
    fahrenheit = Math.floor((weather.paris.temp * (9 / 5)) + 33.8);
    alert(`⛅ 
    It is currently ${weather.paris.temp}°C(${fahrenheit}°F) in  ${city} with a humidity of ${weather.paris.humidity} %`)
} else if (city === 'tokyo') {
    fahrenheit = Math.floor((weather.tokyo.temp * (9 / 5)) + 33.8);
    alert(`⛅ 
    It is currently ${weather.tokyo.temp}°C(${fahrenheit}°F) in  ${city} with a humidity of ${weather.tokyo.humidity} %`)
} else if (city === 'lisbon') {
    fahrenheit = Math.floor((weather.lisbon.temp * (9 / 5)) + 33.8);
    alert(`⛅ 
    It is currently ${weather.lisbon.temp}°C(${fahrenheit}°F) in  ${city} with a humidity of ${weather.lisbon.humidity} %`)
} else if (city === "san francisco") {
    fahrenheit = Math.floor((weather["san francisco"].temp * (9 / 5)) + 33.8);
    alert(`⛅ 
    It is currently ${weather["san francisco"].temp}°C(${fahrenheit}°F) in  ${city} with a humidity of ${weather["san francisco"].humidity} %`)
} else if (city === 'oslo') {
    fahrenheit = Math.floor((weather.oslo.temp * (9 / 5)) + 33.8);
    alert(`⛅ 
    It is currently ${weather.oslo.temp}°C(${fahrenheit}°F) in  ${city} with a humidity of ${weather.oslo.humidity} %`)

} else {
    alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}"`)
};
*/
let now = new Date();
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
let minuits = now.getMinutes();
let time = document.querySelector('.date');
time.innerHTML = `${day}, ${hour}<strong>:</strong>${minuits}`;

let search = document.getElementById('search-input');
let cityName = document.querySelector('.city-name');
let searchButton = document.querySelector('.search-btn');
let currentLocation = document.querySelector('.location');

searchButton.addEventListener('click', searchCity);
currentLocation.addEventListener('click', findLocation);

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

function findLocation() {
    navigator.geolocation.getCurrentPosition(showposition);
}

function showposition(position) {
    let li = document.querySelector('.position');
    li.innerHTML = `Latitude: ${Math.round(position.coords.latitude)}, Longitude: ${Math.round(position.coords.longitude)}`
}

let temperature = document.querySelector('.temperature');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let climate = document.querySelector('.climate');
let image = document.querySelector('.image');


function showTemperature(response) {
    console.log(response);
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = Math.round(response.data.main.humidity);
    wind.innerHTML = response.data.wind.speed;
    climate.innerHTML = response.data.weather[0].main;
    let imageSrc = response.data.weather[0].icon;
    image.src = `http://openweathermap.org/img/wn/${imageSrc}@2x.png`;

}


//{city name},{state code},{country code}&appid={API key}