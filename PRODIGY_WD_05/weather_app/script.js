const apiKey = 'a08d4693d0c50bc94739bef2d7cf1493';
// const location='d8cf1eda69d444c8841da4658dc39e81';
// &ip_address=2409:4043:2d88:c429:2883:da36:f18c:44cb
async function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

async function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchWeatherData(url);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeatherData(data) {
    document.getElementById('location-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity} %`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-info').style.display = 'block';
}