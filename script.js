const apiKey = "a832b62c9b5942b0972134644252608";
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const welcomeSection = document.getElementById("welcomeSection");
  const weatherInfoDiv = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfoDiv.style.display = "block";
    weatherInfoDiv.innerHTML = `<p style="color:red;">⚠️ Please enter a city name!</p>`;
    welcomeSection.style.display = "none";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      let errorMsg = "❌ Something went wrong!";
      if (data.cod == "404") errorMsg = "🏙️ City not found. Try again!";
      if (data.cod == "401") errorMsg = "🔑 Invalid API key!";
      weatherInfoDiv.style.display = "block";
      weatherInfoDiv.innerHTML = `<p style="color:red;">${errorMsg}</p>`;
      welcomeSection.style.display = "none";
      return;
    }

    displayWeather(data);

  } catch (error) {
    weatherInfoDiv.style.display = "block";
    weatherInfoDiv.innerHTML = `<p style="color:red;">⚡ Network error. Please try again.</p>`;
    welcomeSection.style.display = "none";
  }
}

function displayWeather(data) {
  const welcomeSection = document.getElementById("welcomeSection");
  const weatherInfoDiv = document.getElementById("weatherInfo");

  // OpenWeatherMap icon
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${icon}" alt="Weather Icon">
    <p><strong>🌡️ Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>☁️ Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>🌬️ Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;

  weatherInfoDiv.innerHTML = weatherHTML;
  weatherInfoDiv.style.display = "block";
  welcomeSection.style.display = "none";
}
