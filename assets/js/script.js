// define my variables

let cityList = [];
let now = moment().format("dddd, MMMM Do, YYYY"); 
const apiKey = "fbc8e0f7f4930b8cc94ef9a73ca2f05d";


// WHEN I click the search button

$("#add-city").on("click", function ( event ) {


    event.preventDefault();

    let city = $("#city-search").val();

    console.log( city )

    const getCitySearches = localStorage.getItem("searchHistory");

    let prevSearches = [];
    const formatSearches = JSON.parse(getCitySearches)

    if (formatSearches) {
        prevSearches = formatSearches;
    }

    // adds the current city search to the previous search array
    prevSearches.push( city );

    const searchHistory = JSON.stringify( prevSearches );

    localStorage.setItem("searchHistory", searchHistory);

    citySearch( city );

})

// function makeWeatherRequest( search ) {
// function makeWeatherRequest( ) {
    // Perfoming an AJAX GET request to our queryURL


function citySearch ( city ) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response)
            $("#city").text(response.name + " " + now);
            $("currentDay").text(now)
            $("#weatherImg").attr(
                "src",
                "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
              );
            $("#main_weather").text(response.weather[0].main);
            $("#temperature").text(((((response.main.temp)-273.15)*9/5)+32).toFixed(2) + " °F");
            $("#pressure").text(response.main.pressure);
            $("#humidity").text(response.main.humidity + "%");
            $("#wind").text(response.wind.speed + "mph")

            let long = response.coord.lon;
            let lat = response.coord.lat;

            var uvQueryUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey;

            $.ajax({
                url: uvQueryUrl,
                method: "GET"
            }).then(function(uvGet) {
                console.log(uvGet)
                $("#uvindex").text(uvGet.value);
            });

            var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

            $.ajax({

                url: forecastQueryUrl,
                method: "GET"

            }).then(function(forecast) {
                
                let indexForecast = 1;

                $("#cityFC" ).text("5 day forecast for " + forecast.city.name);

                console.log(forecast.list.length)

                for (let i = 0; i < (forecast.list.length); i++) {

                  $("#day" + indexForecast).children("#date").text("Date: " + forecast.list[i].dt_txt);
                  $("#weatherImg" + indexForecast).attr(
                    "src",
                    "http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png"
                  );
                  $("#day" + indexForecast).children("#temperature").text("Temperature: " + ((((forecast.list[i].main.temp)-273.15)*9/5)+32).toFixed(2) + " °F");
                //   $("#temperature" + i).text("Temperature1: " + ((((forecast.list[i].main.temp)-273.15)*9/5)+32).toFixed(2) + " °F");
                  $("#day" + indexForecast).children("#pressure").text("Pressure: " + forecast.list[i].main.pressure);
                  $("#day" + indexForecast).children("#humidity").text("Humidity: " + forecast.list[i].main.humidity + "%");
                  $("#day" + indexForecast).children("#wind").text("Wind: " + forecast.list[i].main.wind.speed + "mph");

                  
                  indexForecast ++;
                }

            });

        renderCityButtons();
    
    });

}
          
          //Renders buttons based on cities searched. Also includes searches in local storage

function renderCityButtons() {

    $("#saved-city").empty();

    const getSearches = localStorage.getItem("searchHistory");
    const getCitySearches = JSON.parse(getSearches) || [];

    getCitySearches.forEach(( search ) => {

        let button = $("<button>");
        button.addClass("city");
        button.text(search);
        const searchFunction = () => citySearch( search );

        button.click(searchFunction);
        $("#saved-city").append(button);

    });
}

renderCityButtons();