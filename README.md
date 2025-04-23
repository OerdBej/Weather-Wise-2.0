# Weather Wise

A modern weather application that provides detailed weather information and activity recommendations based on current conditions.

<p align="center">
  <a href="#">Live Demo</a> (Coming Soon) · 
  <a href="https://github.com/YOUR_USERNAME/my-weather-wise/issues">Report Bug</a>
 </p>

## Content 

- [Weather Wise](#weather-wise)
  - [Content](#content)
  - [Introduction](#introduction)
  - [Technologies](#technologies)
  - [Languages](#languages)
  - [Launching the project](#launching-the-project)
  - [Deployment](#deployment)
  - [Project Folder management](#project-folder-management)
    - [Assets](#assets)
    - [Componenets](#componenets)
      - [Current Weather Folder](#current-weather-folder)
      - [Status Bar folder](#status-bar-folder)
      - [The Current Rating File](#the-current-rating-file)
      - [The Utils Folder](#the-utils-folder)
    - [APP.css](#appcss)
    - [APP.js](#appjs)
    - [Other Files to Consider](#other-files-to-consider)
  - [Rating Logic](#rating-logic)
  - [Sports Research](#sports-research)
  - [Project Links](#project-links)
  - [The API's](#the-apis)
  - [Future development](#future-development)
  - [Contributions](#contributions)
## Introduction

The weather wise application was designed to give the user the information in a fast and affective way about how the weather would impact their day participating in their selected sport. It achieves this with taking into account the weather factors that will affect the specified sport, which has been selected by the user. Then it will run an algorithm that will check the parameters of the weather and produce an easy to understand rating system. This application provides users with accurate weather data and personalized recommendations for various outdoor activities based on current weather conditions. It features a modern, responsive UI with light and dark mode support.

## Technologies
The project is built with modern technologies including:

### Frontend Framework and Libraries
- React with TypeScript
- Material UI components and icons
- React Router for navigation
- CSS with modern features (variables, flexbox, etc.)

### State Management
- React Context API for global state
- Custom hooks for weather and location data

### APIs
- OpenWeatherMap API for weather data and forecasts
- Geolocation services

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-weather-wise.git
   cd my-weather-wise
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
   You can use the included example API key for demo purposes: `1635890035cbba097fd5c26c8ea672a1`

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Deployment

This project can be easily deployed to platforms like Netlify, Vercel, or GitHub Pages.

### Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Project Folder management
The project is broken out into componenets, the main components in the project are under the source folder, a breakdown of the folders and files can be seen in the following section. 
### Assets
The assets folder contains all the images which relate to the project, they include the icons to the sports selection page and also the the images for the weather icons.

### Componenets
This folder contains all the projects components, which are shown below.
#### Current Weather Folder
This folder contains the  current weather component and the CSS for that component.
#### Status Bar folder
This folder contains the files for the rating circle which is called ProgressBar and the CSS for that component.
#### The Current Rating File
This file contains the content of the currentRating component to render the current rating page, it takes some variables from the MyProvider using context.

#### The Utils Folder
Contains the some of main logic for the project, including the API calls the logic to determine the rating for each sport and the sports data for each sport used when rending each selected sport.

### APP.css 
This file contains the main css for the project, some components were extracted and given their own css file due to the growing size of the APP.css file, in the future the aim would be to reduce this file.

### APP.js 
This file contains the main components that will be render in the project which are placed within react router for navigation throughout the project.

### Other Files to Consider
There is also two hidden files in the project, the .gitignore and the .env, the .env has been explained already. But the .gitignore contains all the files that will be blocked from being uploaded to GitHub.

## Rating Logic
The rating logic was designed by using weighted percentages out of 10. The follow documentation can be found within the Drive Folder of the project :
 [Rating Logic](https://docs.google.com/spreadsheets/d/1p70ekIo1Y9cjNWzRW7qnkRy26js3-0CaIBB37DIykLE/edit#gid=0)

The above file will show the excel used to work out the calculations of the project.

The written documentation which describes the logic for each sport can be found here: [Rating Description](https://docs.google.com/document/d/1-6jl5doi0yxx2qOCsEYJgLoKVLXTchKOUsKekyj6nxs/edit)

The documentation shows what weather factors were taken into account for the each sport that was consider, please take into account, that one of the main benefits of this project is about reusablity and scalability, so as we continue to work on the project the sports will be adding and updated.

## Sports Research
The next piece of documentation is the sports research which can be found here [Sports Research](https://docs.google.com/document/d/1MoCuNbKWR1nALxiuKG2vW8IAAUBz4IIrC84EyWFgNMc/edit)

## Project Links
The project links file contains links to all the external information gathered for the creation of the project. This is not an extensive list. It can be found here [Project Link](https://docs.google.com/document/d/1CigW9Lo96P91aW-7e1iCDInfQbjQc3KYd0_NT4gKNTw/edit)

## The API's
The API's that were used in this project are as follows:
1. The location API, this gets the geolocation of the city that the user has input.
2. The weather API, this API gets the weather using the geolocation from the previous API.
3. The air pollution API which gives the air pollution quality according to the geolocation.

The API's can be found at the following site [Open Weather Map](https://openweathermap.org/api)
## Features

- **Modern UI**: Clean, responsive design with intuitive navigation
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Weather Data**: Comprehensive weather information including temperature, humidity, wind, and more
- **Activity Recommendations**: Get personalized recommendations for outdoor activities based on current weather
- **Sports Selection**: Choose from multiple sports to get tailored weather ratings
- **Air Quality**: View air quality data to plan your outdoor activities safely

## Future Development

- Add more sports and activities
- Implement weekly forecasts for better planning
- Add user accounts to save preferences
- Integrate with fitness tracking apps
- Add location-based activity suggestions

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR_USERNAME/my-weather-wise/issues).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Original concept inspired by the Weather Wise App
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from Material UI
