// array for local storage
var Searches = [];

var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector("#current-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var recentContainerEl = document.querySelector("#recent");
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    Searches.push(city);
    saveInputs();
    getCityCoord(city);

}
// get the city coordinates
var getCityCoord = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=517de5faf3cb347639711104e90d0acb";
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                getWeather(lat, lon)
            });
        } else {
            alert("City not found")
        }
    })
    .catch(function(error) {
        alert("Not found")
    })
};
// get weather for a city
var getWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=517de5faf3cb347639711104e90d0acb";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            DisplayCurrent(data.current)
            displayForecast(data.daily)
        });
    });
}
// display current temp 
var DisplayCurrent = function(current) {
    // clear old content
    currentContainerEl.textContent = "";

    // get city name
    var cityName = cityInputEl.value;
    // console.log(cityName);
    // get current temp
    var currTemp = current.temp;
    // get wind
    var windSpd = current.wind_speed;
    // get humidity
    var humidity = current.humidity;
    // get UV index
    var uvIndex = current.uvi;
    
    // create an h3 for the city name
    var cityEl = document.createElement("h3");
    cityEl.textContent = cityName;
    currentContainerEl.appendChild(cityEl);

    // create a ul for the temp stuff
    var currentListEl = document.createElement("ul");
    // create a li for the current temp
    var tempEl = document.createElement("li");
    tempEl.textContent = "Temp: " + currTemp + "°F";
    currentListEl.appendChild(tempEl);
    // create li for the current wind
    var windEl = document.createElement("li");
    windEl.textContent = "Wind: " + windSpd + "MPH";
    currentListEl.appendChild(windEl);
    // create li for the current humidity
    var humidEL = document.createElement("li");
    humidEL.textContent = "Humidity: " + humidity + "%";
    currentListEl.appendChild(humidEL);
    // create li for current UV Index
    var indexEl = document.createElement("li");
    indexEl.textContent = "UV Index: " + uvIndex;
    currentListEl.appendChild(indexEl);
    // append list to container
    currentContainerEl.appendChild(currentListEl);
}
// display 5 day forecast
var displayForecast = function(forecast){
    // clear old content
    forecastContainerEl.textContent = "";
    // create header 
    var headerEl = document.createElement("h3");
    headerEl.textContent = "5-Day Forecast:";
    forecastContainerEl.appendChild(headerEl);

    for (var i = 0; i < 5; i++) {
        // get the temp
        var temp = forecast[i].temp.day;
        // get the wind speed
        var windSpd = forecast[i].wind_speed;
        // get the humidity
        var humid = forecast[i].humidity;
        // create a card for the day
        dailyCardEl = document.createElement("div");
        dailyCardEl.ClassList = "row justify-space-between";
        // create ul for forecast stuff
        var dailyListEl = document.createElement("ul")
        // create li for temp
        var tempEl = document.createElement("li");
        tempEl.textContent = temp + " °F";
        dailyListEl.appendChild(tempEl);
        // create li for wind
        var windEl = document.createElement("li");
        windEl.textContent = windSpd + " MPH";
        dailyListEl.appendChild(windEl);
        // create li for humidity
        var humidEl = document.createElement("li");
        humidEl.textContent = humid + " %";
        dailyListEl.appendChild(humidEl);

        // append all to container
        dailyCardEl.appendChild(dailyListEl);
        forecastContainerEl.appendChild(dailyCardEl);
    

    }
}
// display recent searches
var displayRecent = function(recent) {
    // create new span
    var searchSpan = document.createElement("span");
    searchSpan.textContent = recent;
    // append to the recent container
    recentContainerEl.appendChild(searchSpan);
}

var saveInputs = function() {
    localStorage.setItem("Searches", JSON.stringify(Searches));
}

var loadInputs = function() {
    
    var savedSearches = localStorage.getItem("Searches");

    savedSearches = JSON.parse(savedSearches);
    
    // loop through searches array
    for (var i = 0; i < savedSearches.length; i++) {
        displayRecent(savedSearches[i]);
    }

    
}
loadInputs();
cityFormEl.addEventListener("submit", formSubmitHandler);