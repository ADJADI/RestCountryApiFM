# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

In this challenge , we were tasked to build a REST Countries API application that displays information about countries. This project is mainly composed of two parts : - the one who handle the first countries information displayed and -the second who is responsible to show more information about the countries first displayed. In this project we also need to handle a search bar who is used in order to select the desired country, and we also need to add a dropDown input that let the user selection the desired region part of world he want to display.

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Screenshot

![mobile screen Light Mode](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20170351.png)
![mobile screen Dark Mode](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20170855.png)
![mobile screen Dark Mode with Asia selected and dropDown Open](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20170913.png)
![mobile screen Dark Mode with Asia selected](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20170944.png)
![desktop screen Light Mode](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171007.png)
![desktop screen Light Mode with Asia selected](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171027.png)
![desktop screen Light Mode with with search bar set to be](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171038.png)
![desktop screen Dark Mode with with search bar set to be](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171047.png)
![desktop screen Dark Mode with more info component](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171100.png)
![desktop screen Light Mode with more info component](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171111.png)
![mobile screen Dark Mode with more info component](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171145.png)
![mobile screen DarLight Mode with more info component](/country-flags/src/assets/screenShots/Capture%20d'écran%202024-03-19%20171207.png)

### Links

- Live Site URL: [Add live site URL here](https://rest-country-api-fm.vercel.app)

## My process

For this project I chose to use React as my main framework, along with redux because I quickly noticed that I needed to use something to manage the data properly. I then settle my redux reducers, actions and my store in order to make it working. Once this was done I created a hook to fetch my data. After that I created my first component, install react-dom-router to handle my routes. Once all was working I decided to add to redux a DarkMode option and created another hook to use with all my components. I created my second component and use react-dom-router to render it easily depending on the click on my first component. Add my regions filter and my selected regions.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [redux](https://redux.js.org/) - JS library
- [react-dom-router](https://reactrouter.com/en/main) - npm package/ react library
- [Tailwindcss](https://tailwindcss.com/) - For styles

### What I learned

First of all I learned a lot during this project and It wasn't easy at all. First time for me using react-redux, first time using deeper react-dom-router. I struggle a lot to use combineStore in order to combine my DarkModeReducer and my FlagsReducer, separately they were working but combine nothing was working. I finally find the solution and it was just a simple change that make both works together :

```js
const mapStateToProps = (state) => ({
  countries: state.flags.countries,
  regions: state.flags.regions,
});
```

because I wasn't mentioning the name of my flags reducer.
After that I struggled to use react-router in my CountryDetailPage component because at first I was using the data via useLocation in order to display the country information of the country that have been clicked on, but the issue with that is when I would like to navigate between my borders the data used for showing more info was set to the country information clicked in my CountryList component. I finally success to resolve this issue after hours of searching, and I have finally fetched my data directly in this component.
I have also learned to use some hooks like the countries of i18n-iso-countries to convert alpha3code to country name :

```js
const convertAlpha3ToFullName = (alpha3Codes) => {
  if (!alpha3Codes) return []; // Check if alpha3Codes is undefined
  return alpha3Codes.map((alpha3) => {
    return countries.getName(alpha3, "en");
  });
};
```

### Continued development

I would like to improve my react-redux skills because I learned with a course before and it is the first time I am using it in a real case project. I still improving my react/javaScript/tailwindcss skills too.

### Useful resources

- [chatGpt](https://chat.openai.com) - This helped me to create the basic structure and along the entire project, asking inquiries, correct me...
- [forums] - Combine with chatGpt that helps a lot when I was stuck in a part for a long time and when chatGpt wasn't helpful anymore.

## Author

- Frontend Mentor - [@ADJADI](https://www.frontendmentor.io/profile/ADJADI)
