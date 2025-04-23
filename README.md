# WeatherActive

**WeatherActive** is a weather-aware app designed to help users understand how current weather conditions impact their performance in a selected sport. The app provides quick, relevant, and easy-to-understand insights through a sport-specific weather rating system.

Originally built as a student project, this version was **fully refactored and converted from React (JavaScript) to React + TypeScript** for better type safety, scalability, and developer experience.

---

## 🌤️ What It Does

- Lets users select a sport and see how weather conditions will affect it.
- Uses a custom algorithm to rate weather suitability for that sport.
- Presents results in a clean and understandable way, enhancing decision-making for outdoor activity planning.

---

## 🧰 Built With

- [`react`](https://reactjs.org/)
- [`react-router-dom`](https://reactrouter.com/)
- [`@mui/icons-material`](https://mui.com/components/icons/)
- [`@emotion/react`](https://emotion.sh/docs/introduction)
- [`@emotion/styled`](https://emotion.sh/docs/styled)
- [`axios`](https://axios-http.com/) - For API requests
- **TypeScript**

## 🔑 API Integrations

- **OpenWeather API** - For weather data
- **GNews API** - For sport-related news articles

> **Important**: This project uses external APIs that require API keys. For security reasons, you need to provide your own API keys to use these features:
> - For news functionality, sign up for a free API key at [GNews](https://gnews.io/)
> - Replace the API key in `src/utils/newsApi.ts` with your own
> - For a production environment, we recommend using environment variables instead of hardcoding API keys

---

## ✨ What’s New in Version 2.0

### 🔁 Migration & TypeScript Upgrade
- Fully converted the entire codebase from **JavaScript** to **TypeScript**
- Added proper typing for contexts, props, API responses, and components
- Improved developer experience with better editor support and type checking

### 🎨 UI & Design Enhancements
- Modern gradient background with smooth transitions
- CSS variables for consistent theming
- Updated typography using **Poppins** and **Roboto**
- Simplified app title to **WeatherActive**

### 📱 Usability Upgrades
- Responsive, sticky navigation with scroll effects
- Enhanced navbar using Material UI icons and active state
- Feature cards for better homepage navigation
- Polished search with improved focus states

### 🌗 Features & Interactivity
- Dark/light mode toggle with saved preferences
- Improved responsiveness on mobile devices
- Better visual feedback on hover/click
- Sport-specific news integration with GNews API
- Clean, minimal design with yellow accent theme

### 🧹 Code Quality & Refactoring
- Removed duplicate entry points (`index.tsx`, `App_new.tsx`)
- Cleaned up and organized components
- Fixed all TypeScript errors, especially in `WeatherContext.tsx`
- Removed legacy files from CRA (Create React App)
- Updated `package.json` and configurations for **Vite**
- Finalized full migration from CRA to Vite for faster builds and better DX

---

## 🛠️ Project Cleanup Summary

> ✅ **What was wrong (legacy version):**
- Duplicate rendering files (`index.tsx`, `main.tsx`)
- Incomplete migration from CRA to Vite
- Missing types and TypeScript errors
- Outdated or broken configs

> 🧼 **What was fixed:**
- Kept only `main.tsx` as entry point
- Removed legacy/unused files
- Fixed all typing issues, especially around API responses
- Cleaned up `package.json`
- Verified both dev and production builds

---

## 📌 Notes

This is **WeatherActive**, a modern weather application that helps users plan activities based on weather conditions. It features a full TypeScript implementation, intuitive UI/UX, and a clean, scalable codebase.

### 🛡️ Security Considerations

- **API Keys**: For security, replace the GNews API key with your own in a production environment
- **Environment Variables**: In a production setting, use environment variables for all API keys
- **CORS**: The app is designed to work with APIs that allow cross-origin requests

### 🚀 Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Replace the API keys with your own (see API Integrations section)
4. Run `npm run dev` to start the development server
5. Open `http://localhost:3000` in your browser
