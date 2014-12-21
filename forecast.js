// Forecast.js
// Written by Bryan Jenkins
// Copyright 2014 Develip, LLC

var http = require("http");
var https = require("https");
var apiKey = "YOUR_FORECAST_IO_KEY_GOES_HERE";

// Printing Functions
function printWeather(place, forecast, high, low) {
  var message = "In "+ place +" it's currently " + forecast +
                ". The high is " + high + "° and the low is " + low +"°.";
  console.log(message);
}
function printError(error) {
  console.error(error.message);
}

// Convert Zip and Get Weather
function get(zip) {

  // Get the Lat and Long from Zipcode
  var request = https.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip,
                function(response) {
    // Add data chuncks to body as the are recieved
    var body = "";
    response.on("data", function(chunk){
      body += chunk;
    });
    // Once response has ended, parse JSON and create the weather request
    response.on("end", function(){
      if(response.statusCode === 200) {
        try {
          //Get the Forcast
          var location = JSON.parse(body);
          var place = location.results[0].formatted_address;
          var latitude = location.results[0].geometry.location.lat;
          var longitude = location.results[0].geometry.location.lng;
          var forecastRequest = https.get("https://api.forecast.io/forecast/" +
                                apiKey + "/" + latitude + "," + longitude, function(forecastResponse) {

            // Add data chuncks to body as the are recieved
            var forecastBody = "";
            forecastResponse.on("data", function(chunk){
              forecastBody += chunk;
            });

            // Once response has ended, parse JSON and print weather
            forecastResponse.on("end", function(){
              if(forecastResponse.statusCode === 200) {
                try {

                  //Parse the data
                  var forecast = JSON.parse(forecastBody);
                  printWeather(place, forecast.currently.summary,
                                forecast.daily.data[0].temperatureMax,
                                forecast.daily.data[0].temperatureMin);
                } catch(e) {
                  //Parse Error with Weather
                  printError(e);
                }
              } else {
                //Status Code Error
                printError({message: "There was an error retrieving the weather. (" +
                                      http.STATUS_CODES[forecastResponse.statusCode] + ")"})
              }
            });

          });

          //Connection Error With Forecast
          forecastRequest.on("error", printError);

        } catch(e) {
          //Parse Error With Zipcode Coversion
          printError(e);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error converting the latitude and longitude. (" +
                              http.STATUS_CODES[response.statusCode] + ")"})
      }
    });

  });

  //Connection Error with Zipcode
  request.on("error", printError);
}

// Make module available
module.exports.get = get;
