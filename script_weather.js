// Try this later: API Params to call by City, Country Code
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

// const url = 'https://open-weather13.p.rapidapi.com/city/new%20york';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'cd04ee9778mshc461ccb32dc0589p1945a6jsn503eda24c512',
//     'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
//   }
// };

//  async function fetchWeather() {
//      try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log(result.weather[0].main);
//   } catch (error) {
//     console.error(error);
//   }
//  }

// fetchWeather()

/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

/* DIV ID's you'll need access to 👇
"city-name"
"weather-type"
"temp"
"min-temp"
"max-temp"
*/

// API_KEY for maps api
let API_KEY = "b8ed4b3f66a5955dfea1ea99d649bfbb";

// Country mapping list
// array to store emojis
// var countryToCode = {
//   "australia": 'AU',
//   "unitedstates": 'US',
//   "vietnam": 'VN',
// }

// Function to get a country code if required.
// function getCountryCode(country){
//   const countryName = country.toLowerCase().replaceAll(' ', '') //take value from input and remove spaces and make lowercase
//   console.log({country})
//   console.log({countryName})
//   const countryToCodeKeys = Object.keys(countryToCode)
//   const countryCheck = countryToCodeKeys.includes(countryName); //check if value is included in object
//   if (countryCheck) {
//     const countryCode = countryToCode[countryName];
//     console.log({countryCode})
//     return countryCode;
//   }
//   else {
//     alert("Country not found. Check the spelling.")
//   }
// }


/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
  //HINT: Use template literals to create a url with input and an API key
   async function fetchWeather(city, country) {
     console.log({country})
     const errorLocationDiv = document.getElementById('errorLocation')
     const cityNameDiv = document.getElementById('city-name')
     const countryNameDiv = document.getElementById('country-name')
     const weatherTypeDiv = document.getElementById('weather-type')
     const tempDiv = document.getElementById('temp')
     const tempMinDiv = document.getElementById('min-temp')
     const tempMaxDiv = document.getElementById('max-temp')
     errorLocationDiv.innerText = ""
     weatherTypeDiv.innerText = "----"
     tempDiv.innerText = "--"
     tempMinDiv.innerText = "--"
     tempMaxDiv.innerText = "--"
     cityNameDiv.innerText = "----"
     countryNameDiv.innerText = "----"
     const url = "https://api.openweathermap.org/data/2.5/weather";
     const fullURL = `${url}?q=${city},${country}&appid=${API_KEY}&units=metric`
     console.log({fullURL})
       try {
        const response = await fetch(fullURL);
        const result = await response.json();
        // console.log(result)
        // console.log(result.message);
        if (result.message === "city not found") {
          errorLocationDiv.innerText = "city or country not found"
        }
        return result
      } catch (error) {
         errorLocationDiv.innerHTML = error.message.value;
      //`<span style='color: red;'>${error}</span>`
        console.error(error);
      }
  }


/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
const searchCity = () => {
  const city = document.getElementById('city-input').value;
  if (city.toLowerCase() == "melbourne") {
    fetchWeather(city, "AU")
    .then((results)=>{
      showWeatherData(results);
    }).catch((error)=>{
      console.log(error);
      console.log("Soemthing happened");
    })
  }
  else {
  // CODE GOES HERE
  // Get country search input if required
  // const country = document.getElementById('country-input').value;
  // getCountryCode(country)
  // fetchWeather(city, getCountryCode(country))
    fetchWeather(city)
    .then((results)=>{
      showWeatherData(results);
    }).catch((error)=>{
      console.log(error);
      console.log("Soemthing happened");
    })
  }
}

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
const showWeatherData = (weatherData) => {
  //CODE GOES HERE
  console.log({weatherData})
  
  const cityNameDiv = document.getElementById('city-name')
  const countryNameDiv = document.getElementById('country-name')
  const weatherTypeDiv = document.getElementById('weather-type')
  const tempDiv = document.getElementById('temp')
  const tempMinDiv = document.getElementById('min-temp')
  const tempMaxDiv = document.getElementById('max-temp')
  cityNameDiv.innerText = weatherData.name
  countryNameDiv.innerText = weatherData.sys.country
  const weatherType = weatherData.weather[0].description
  weatherTypeDiv.innerText = (weatherType.charAt(0).toUpperCase() + weatherType.slice(1));
  tempDiv.innerText = weatherData.main.temp
  tempMinDiv.innerText = weatherData.main.temp_min
  tempMaxDiv.innerText = weatherData.main.temp_max
}
