var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector("#current-container");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    
    getCityCoord(city);
}

var getCityCoord = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=517de5faf3cb347639711104e90d0acb";
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getWeather(lat, lon)
        })
    })
}
var getWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=517de5faf3cb347639711104e90d0acb";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            console.log(data.current);
            DisplayCurrent(data.current)
        });
    });
}

var DisplayCurrent = function(current) {
    // clear old content
    currentContainerEl.textContent = "";

    // get city name
    var cityName = cityInputEl.value;
    // console.log(cityName);
    // get current temp
    var currTemp = current.temp;
    console.log(currTemp);
    // get wind
    var windSpd = current.wind_speed;
    console.log(windSpd);
    // get humidity
    var humidity = current.humidity;
    console.log(humidity);
    // get UV index
    var uvIndex = current.uvi;
    console.log(uvIndex);

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
cityFormEl.addEventListener("submit", formSubmitHandler);