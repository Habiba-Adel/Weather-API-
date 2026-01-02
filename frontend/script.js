//DOM getting element references
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherCard = document.getElementById('weatherCard');

const cityName = document.getElementById('cityName');
const dateEl = document.getElementById('date');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feelsLike');


//event listener for user actions 
//listen if the user click on the search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) return;

  fetchWeather(city);
});

//or if the user just pressing enter rather than clicking the search button and that making the ux more smooth
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

async function fetchWeather(city) {
  showLoading();
  hideError();
  hideWeather();

  try {
    // Later: change this to your backend URL
    const response = await fetch(`http://localhost:8080/weather?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'City not found');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
}
function displayWeather(data) {
  weatherCard.classList.remove('hidden');

  cityName.textContent = data.resolvedAddress || 'Unknown City';
  dateEl.textContent = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  const conditions = data.currentConditions;
  if (!conditions) {
    description.textContent = 'No data available';
    return;
  }

  temperature.textContent = `${conditions.temp || 'N/A'} °C`;
  description.textContent = conditions.conditions || 'N/A';
  humidity.textContent = `${conditions.humidity || 'N/A'} %`;
  wind.textContent = `${conditions.windspeed || 'N/A'} km/h`;
  feelsLike.textContent = `${conditions.feelslike || 'N/A'} °C`;
}



function showLoading() { loading.classList.remove('hidden'); }
function hideLoading() { loading.classList.add('hidden'); }
function showError(msg) { errorDiv.textContent = msg; errorDiv.classList.remove('hidden'); }
function hideError() { errorDiv.classList.add('hidden'); }
function hideWeather() { weatherCard.classList.add('hidden'); }