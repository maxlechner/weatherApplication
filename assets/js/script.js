// define my variables

let cityList = [];
let now = moment().format("dddd, MMMM Do, YYYY"); 
const apiKey = "fbc8e0f7f4930b8cc94ef9a73ca2f05d";


// WHEN I click the search button

$("#add-city").on("click", function ( event ) {

    event.preventDefault();

    let city = $("#city-search").val();

    console.log(city)

    const getCitySearches = localStorage.getItem("citySearches");

    let prevSearches = [];
    const formatSearches = JSON.parse(getCitySearches)

    if (formatSearches) {
        prevSearches = formatSearches;
    }

    // adds the current city search to the previous search array
    prevSearches.push( city );

    const searchHistory = JSON.stringify(prevSearches);
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
            $("#city").text(response.name);
            $("#main_weather").text(response.weather[0].main);
            $("#description_weather").text(response.weather[0].description);
            $("#temperature").text(((((response.main.temp)-273.15)*9/5)+32).toFixed(2));
            $("#pressure").text(response.main.pressure);
            $("#humidity").text(response.main.humidity);

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
                console.log(forecast)
                // $("#uvindex").text(uvGet.value);
            });


    });
}