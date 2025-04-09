# 🌍 Global Weather Forecast Dashboard

A clean, minimalist weather dashboard that allows users to search for cities and view real-time weather conditions and a 5-day forecast using the [Open-Meteo](https://open-meteo.com) API.

![screenshot](./assets/screenshot.png)

---

## 🧰 Tech Stack Used

### 🔹 Frontend

**Technologies:**  
- **HTML5** – For structuring the webpage layout  
- **CSS3** – For styling and responsive layout  
- **Vanilla JavaScript** – For:
  - Fetching weather data and geolocation info
  - Autocomplete city search
  - Updating the DOM dynamically
  - Handling events (input, enter key, click)

**Assets Folder (`/assets`)**  
Stores all the weather icons like `sun.png`, `cloud.png`, `rain.png`, etc., and a `globe.png` for the header.

---

### 🔹 Backend

**Technologies:**  
- **Node.js + Express.js** – Web server and API handler  
- **Axios** – HTTP client used to fetch external API data  
- **CORS** – Middleware for handling cross-origin requests  

**Functionality:**  
- Serves static files from `frontend/public`  
- Proxies weather requests to the Open-Meteo API  
- Handles `/api/weather?city=CityName` to:
  1. Geocode city name to coordinates  
  2. Fetch current + 5-day forecast  
  3. Return a simplified JSON response

---

### 🔹 APIs Used

- 🌍 **Geocoding**: [`https://geocoding-api.open-meteo.com`](https://open-meteo.com/en/docs/geocoding-api)  
- 🌦️ **Forecast**: [`https://api.open-meteo.com/v1/forecast`](https://open-meteo.com/en/docs)  
- ✅ **Completely free with no API key required**

---

## 🚀 Features

- 🔍 Autocomplete city search with country suggestions  
- 🌦️ Displays current temperature, weather icon, and wind speed  
- 📅 5-day weather forecast with high and low temperatures  
- 🎯 Search works on click or Enter key  
- ✨ Clean, responsive UI inspired by Google homepage  
- 📦 Fully offline frontend served with weather icons

---

## 🛠️ Project Structure

weather-dashboard/ │ ├── backend/ │ └── server.js # Express backend │ ├── frontend/ │ └── public/ │ ├── index.html # Main HTML │ ├── style.css # Custom styling │ ├── script.js # Weather logic and autocomplete │ └── assets/ # Weather icons (e.g. sun.png, cloud.png) │ └── README.md


---

## 🔧 Installation & Running

### 📦 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
npm install
node backend/server.js
Visit http://localhost:3000 in your browser.
Type any city name (e.g. Tokyo) and press Enter or click Search.
Autocomplete will suggest locations.
Weather results and 5-day forecast will appear.
