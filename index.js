
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

//const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=`;
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render('weather.ejs')
  });

  app.post("/get-weather", async (req, res) => {
    const searchId = req.body.userInput;
    console.log(searchId)
    try {
      const response = await axios.get(API_URL+searchId+"&units=metric&appid=*******");
      const weatherData = {
        temperature: response.data.main.temp,
        condition: response.data.weather[0].main,
        location: response.data.name,
      };
      res.render("weather.ejs", {some:weatherData });

    } catch (error) {
      // Handle error here
      res.render("weather.ejs", { somee: JSON.stringify ( error.response.data.message) });
      //throw error; // You can re-throw the error or handle it as needed
    }
  })


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  