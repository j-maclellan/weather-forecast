// array for local storage
var searches = [];
var city = "";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");

var currentContainerEl = document.querySelector("#current-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var recentContainerEl = document.querySelector("#recent");
var searchBtnEl = document.querySelector("#recent-city");

// city submit function
var formSubmitHandler = function(event) {
    event.preventDefault();

    city = cityInputEl.value.trim();
    searches.push(city);
    saveInputs();
    loadInputs();
    getCityCoord(city);

}

// search button submit function
var searchSubmitHandler = function(event) {
    event.preventDefault();

    city = event.target.getAttribute("recent-city");
    
    
    if (city) {
        getCityCoord(city);
    }
    currentContainerEl.textContent = "";
    forecastContainerEl.textContent = "";
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
    var cityName = city;
    // get current date
    var currDate = moment().format("MM/DD/YYYY");
    // get weather icon 
    var weather = current.weather[0].icon;
    // get current temp
    var currTemp = current.temp;
    // get wind
    var windSpd = current.wind_speed;
    // get humidity
    var humidity = current.humidity;
    // get UV index
    var uvIndex = current.uvi;
    
    
    
    // create div for the city date and icon
    var citySpanEl = document.createElement("span");

    // create an h3 for the city name + date
    var cityEl = document.createElement("h3");
    cityEl.classList = "font-weight-bold";
    cityEl.textContent = cityName + " " + currDate;
    citySpanEl.appendChild(cityEl);
    // create img for the icon
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + weather + "@2x.png";
    // weatherIcon.classList = "bg-primary";
    citySpanEl.appendChild(weatherIcon);
    currentContainerEl.appendChild(citySpanEl);

    // create a ul for the temp stuff
    var currentListEl = document.createElement("div");
    currentListEl.classList = "text-start"
    // create a p for the current temp
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + currTemp + " °F";
    currentListEl.appendChild(tempEl);
    // create p for the current wind
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + windSpd + " MPH";
    
    currentListEl.appendChild(windEl);
    // create p for the current humidity
    var humidEL = document.createElement("p");
    humidEL.textContent = "Humidity: " + humidity + " %";
    currentListEl.appendChild(humidEL);
    // create div for current UV Index
    var indexEl = document.createElement("span");
    indexEl.classList = "row uvindex-row";
    
    indexEl.textContent = "UV Index:  ";
    // create span for the UV text + color
    var indexSpan = document.createElement("p");
    indexSpan.textContent = uvIndex;
    
    // get background color
    if (uvIndex >= 0.00 && uvIndex <= 2.99) {
        indexSpan.classList = "bg-success";
    }
    else if (uvIndex >= 3.00 && uvIndex <= 5.99) {
        indexSpan.classList = "bg-warning";
    }
    else {
        indexSpan.classList = "bg-danger";
    }
    indexEl.appendChild(indexSpan);
    currentListEl.appendChild(indexEl);
    // append list to container
    currentContainerEl.appendChild(currentListEl);
}
// display 5 day forecast
var displayForecast = function(forecast){
    // clear old content
    forecastContainerEl.textContent = "";
    // create header 
    var headerEl = document.createElement("div");
    headerEl.classList = "col-sm-8 text-center"
    var headerTextEl = document.createElement("h3");
    headerTextEl.textContent = "5-Day Forecast:";
    headerEl.appendChild(headerTextEl);
    forecastContainerEl.appendChild(headerEl);
    // make row div for the forecasts
    var forecastFiveDayContainerEl = document.createElement("div");
    forecastFiveDayContainerEl.classList = "row";

    // get dates
    var nextFiveDays = [
        tomorrow = moment().add(1, "day").format("MM/DD/YYYY"),
        twoDays = moment().add(2, "day").format("MM/DD/YYYY"),
        threeDays = moment().add(3, "day").format("MM/DD/YYYY"),
        fourDays = moment().add(4, "day").format("MM/DD/YYYY"),
        lastDay = moment().add(5, "day").format("MM/DD/YYYY")
    ];
    
    for (var i = 0; i < 5; i++) {
        // get the weather icon
        var weather = forecast[i].weather[0].icon;
        // get the temp
        var temp = forecast[i].temp.day;
        // get the wind speed
        var windSpd = forecast[i].wind_speed;
        // get the humidity
        var humid = forecast[i].humidity;
        // create a card for the day
        dailyCardEl = document.createElement("div");
        dailyCardEl.classList = "col forecast-card";
        // create div for forecast stuff
        var dailyListEl = document.createElement("div")
        // add date
        var date = document.createElement("h6");
        date.textContent = nextFiveDays[i];
        dailyListEl.appendChild(date);
        // create icon
        var weatherIcon = document.createElement("img");
        weatherIcon.src = "http://openweathermap.org/img/wn/" + weather + "@2x.png";
        dailyListEl.appendChild(weatherIcon);
        // create p for temp
        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + temp + " °F";
        dailyListEl.appendChild(tempEl);
        // create p for wind
        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + windSpd + " MPH";
        dailyListEl.appendChild(windEl);
        // create p for humidity
        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + humid + " %";
        dailyListEl.appendChild(humidEl);

        // append all to container
        dailyCardEl.appendChild(dailyListEl);
        forecastFiveDayContainerEl.appendChild(dailyCardEl);
        forecastContainerEl.appendChild(forecastFiveDayContainerEl);
    

    }
}
// display recent searches
var displayRecent = function(recent) {
    // create new button
    var searchBtn = document.createElement("button");
    searchBtn.classList = "searches-btn";
    searchBtn.setAttribute("recent-city", recent);
    searchBtn.textContent = recent;
    // append to the recent container
    recentContainerEl.appendChild(searchBtn);
    
}

var saveInputs = function() {
    localStorage.setItem("searches", JSON.stringify(searches));
}

var loadInputs = function() {
    recentContainerEl.textContent = "";
    var savedSearches = localStorage.getItem("searches");
    if (!savedSearches) {
        return false;
    }
    
    savedSearches = JSON.parse(savedSearches);
    
    // loop through searches array
    for (var i = 0; i < savedSearches.length; i++) {
        displayRecent(savedSearches[i]);
    }
    searches = savedSearches;
}
loadInputs();
cityFormEl.addEventListener("submit", formSubmitHandler);
recentContainerEl.addEventListener("click", searchSubmitHandler);