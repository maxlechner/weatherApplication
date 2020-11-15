// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

// define my variables

// WHEN I click the search button

var cityName;

function handleSearch() {

    makeWeatherRequest( search );

}

// function makeWeatherRequest( search ) {
// function makeWeatherRequest( ) {
    // Perfoming an AJAX GET request to our queryURL
$("#find-city").on("click", function(event) {

    event.preventDefault();

    var apiKey = "&appid=fbc8e0f7f4930b8cc94ef9a73ca2f05d";
    // cityName = "Louisville";
    var cityName = $("#city-name");
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        
            console.log(response)
        });

})


function makeOneCallRequest ( lat, long ) {


}

// $("#find-city").on("click", makeWeatherRequest);