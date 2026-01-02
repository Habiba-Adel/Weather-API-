# 🌤️ Weather API

**A fast, reliable, and professional weather API** built with **Node.js**, **Express**, and **Redis** caching. This project fetches live weather data from **Visual Crossing's Weather API** and serves it to a frontend application.

Perfect for learning **3rd-party API integration**, **caching**, **environment variables**, and **performance optimization**. ⚡

---

## ✨ Features

- 🌍 **Fetch live weather data** by city
- ⚡ **Redis in-memory caching** for ultra-fast responses
- 🛡️ **Error handling** for invalid cities or API failures
- 📱 **Responsive and user-friendly** frontend
- ⏳ **Loading indicators** and user feedback
- 🏗️ **Clean architecture**: frontend + backend separation
- 🔧 **Easily extensible** for future enhancements

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Axios** - HTTP client
- **Redis** - In-memory caching

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **JavaScript** - Logic & interactivity

### 📦 Packages & Modules
- [dotenv](https://www.npmjs.com/package/dotenv) → 🔐 Load environment variables securely
- [axios](https://www.npmjs.com/package/axios) → 🌐 Make HTTP requests to 3rd-party APIs
- [cors](https://www.npmjs.com/package/cors) → 🔓 Enable cross-origin requests from frontend
- [redis](https://www.npmjs.com/package/redis) → 💾 In-memory caching for performance
- [perf_hooks](https://nodejs.org/api/perf_hooks.html) → ⏱️ Measure request performance

---

## ⚡ Performance & Optimization

| Metric | Time |
|--------|------|
| 🎯 **Cache hit** | ~3–5 ms |
| 🌐 **Cache miss** | ~800–1200 ms (API fetch) |
| 📊 **Improvement** | ~99% faster after first fetch |

> 💡 **Using Redis** allowed us to store weather data in local memory and avoid repeated API calls, improving speed and reducing API load.

---

## 🏗️ Project Structure

```
Weather-API/
│
├─ backend/
│  ├─ server.js          # Node.js + Express backend
│  └─ .env               # Environment variables (ignored in git)
│
├─ frontend/
│  ├─ index.html         # Frontend interface
│  ├─ style.css          # Styles
│  ├─ script.js          # JavaScript logic
│  └─ weather-icons/     # Optional folder for local weather icons
│
├─ package.json
├─ package-lock.json
└─ .gitignore
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/Weather-API.git
cd Weather-API
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file in `backend/`

```ini
WEATHER_API_KEY=your_visual_crossing_api_key
REDIS_URL=redis://localhost:6379
PORT=8080
```

### 4️⃣ Start Redis server

Make sure Redis is installed locally or use Docker:

```bash
redis-server
```

### 5️⃣ Run the backend server

```bash
cd backend
node server.js
```

### 6️⃣ Open the frontend

Open `frontend/index.html` in your browser, search for any city, and enjoy real-time weather data! 🌦️

---

## 💡 How It Works

1. 👤 User enters a city in the frontend
2. 🌐 Frontend sends request to Node.js backend
3. 📦 Backend checks Redis cache:
   - ✅ If data exists → return cached data **(fast)**
   - ❌ If not → fetch from Visual Crossing API → store in cache → return response
4. 🖥️ Frontend displays weather details including temperature, humidity, wind, and description

---

## 📈 Implementation Highlights

- ✅ Using `encodeURIComponent(city)` ensures proper URL encoding for cities with spaces or special characters
- ✅ Implemented environment variables to store sensitive keys
- ✅ Frontend dynamically updates weather card with:
  - 🌡️ Temperature
  - ☁️ Description
  - 💧 Humidity
  - 💨 Wind speed
  - 🤔 Feels like
- ✅ Optional: Local weather icons or use OpenWeatherMap icons dynamically

---

## 🔮 Future Enhancements

- 🔄 Add unit switching (Celsius/Fahrenheit)
- 📅 Add forecast for multiple days
- 🚦 Integrate rate-limiting to prevent API abuse
- ☁️ Deploy backend to cloud server (Heroku, Railway, etc.)
- 🔐 Add authentication for API usage
- 🐳 Create Dockerized version for easy deployment
- 🗺️ Add geolocation support to auto-detect user's city
- 📊 Weather history and trends
- 🌙 Dark mode support

---

## 📌 Why This Project is Professional

✅ **Clean separation** of frontend & backend  
✅ **Caching implemented** for production-ready performance  
✅ **Uses 3rd-party APIs safely** with `.env` management  
✅ **Error handling** and UX improvements  
✅ **Well-structured, readable, and maintainable** code  
✅ **Demonstrates full-stack knowledge** in a small, focused project  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

<div align="center">

**Made with ❤️ by Habiba**

⭐ **If you like this project, please give it a star!** ⭐

</div>