const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ 

    extended: true 

}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    console.log(req.body.cityValue);

    const query = req.body.cityValue;

    const apiKey = process.env.API_KEY;

    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey.toString() + "&units=" + units;


    https.get(url, function (response) {

        console.log(response.statusCode);//status of the get request at the api
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp1 = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // console.log(weather);
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is: " + temp1 + " degree celcius</h1>");
            res.write("<img src=" + imageURL + ">")
            res.send();
        });
    });

});

// 



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})

