const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.city;
  const apiKey = "a4e6d4d787b23e7b98da5dee02a34d3f";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write("<p>The weather is currently " + description + "</p>");
      res.write(
        `<h1>The temperature in ${city} is ${temp} degrees Celsius.</h1>`
      );
      res.write(`<img src="${iconURL}">`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
