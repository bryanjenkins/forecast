var forecast = require("./forecast");
var zipcodes = process.argv.slice(2);

zipcodes.forEach(forecast.get)
