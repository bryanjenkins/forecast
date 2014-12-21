{\rtf1\ansi\ansicpg1252\cocoartf1343\cocoasubrtf160
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0\fs24 \cf0 # Forecast\
\
Forecast is a simple Node.js module, written for the command line, that retrieves the forecast for any number of cities based on user inputted zip codes.\
\
### Requirements\
\
Forecast relies on [Node.js]  to work properly.\
\
### Installation\
\
You'll need to include forecast.js in your app directory, and change the apiKey variable to your personal forecast.io api key:\
\
```js\
var apiKey = "YOUR_FORECAST_IO_KEY_GOES_HERE";\
```\
\
Next, set up an app.js file, import forecast.js, and customize the functionality to meet your needs. This example of the app.js file gets the forecast for each zip code provided in the command line call:\
```js\
var forecast = require("./forecast");\
var zipcodes = process.argv.slice(2);\
zipcodes.forEach(forecast.get)\
```\
\
To run the app, navigate to the directory in the command line and then type the following:\
```sh\
node app.js 10001 94101 60290 96802\
```\
\
\
License\
----\
\
MIT\
\
[Node.js]:http://nodejs.org\
\
}