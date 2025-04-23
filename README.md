# Weather Wise 2.0

**Weather Wise 2.0** is a weather-aware app designed to help users understand how current weather conditions impact their performance in a selected sport. The app provides quick, relevant, and easy-to-understand insights through a sport-specific weather rating system.

Originally built as a student project at **Wild Code School** (a 5-month web development bootcamp), this version was **fully refactored and converted from React (JavaScript) to React + TypeScript** for better type safety, scalability, and developer experience.

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
- **TypeScript**

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
- Simplified app title to just **Weather Wise**

### 📱 Usability Upgrades
- Responsive, sticky navigation with scroll effects
- Enhanced navbar using Material UI icons and active state
- Feature cards for better homepage navigation
- Polished search with improved focus states

### 🌗 Features & Interactivity
- Dark/light mode toggle with saved preferences
- Improved responsiveness on mobile devices
- Better visual feedback on hover/click

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

This is **Weather Wise 2.0**, a solo refactor and redesign of the original group project. It features a full migration to TypeScript, improved UI/UX, and a much cleaner, more scalable codebase.
