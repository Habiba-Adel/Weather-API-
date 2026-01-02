import express from 'express';//framwork for handling teh http request 
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import {createClient} from 'redis';
import { performance } from "perf_hooks";//we will use it to test the performance before using cashe and when using teh cashe

dotenv.config();
const app=express();
app.use(cors());//so now any website can makin

const PORT = process.env.PORT || 8080;
//now cause redis is in the my in memory ram but not in the same place with node js so our app will need to go and make a connection with it 
const redisClient = createClient({
  //and in this current project we will use local redis and in the next projects we will dealing with the cloud version
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

//error handling
redisClient.on("error", (err) => console.error("Redis Client Error", err));
//and then awaiting until connecting the node js app with the redis 
//and now we opened the TCP connection between the app and redis
await redisClient.connect();
//this is one of express jobs we can use it to parse all the comming front end requests to ensure that they are converting from bytes sequences into json 
app.use(express.json());


//the functions parameters in js not taking the data type we just say the name of the attribute cause js not type strict
//look this is a service so its role and job is jsut to dealing with the service and that will enable reusability and mor eprofessional

async function getWheather(city) {
  try {
    // const response = await axios.get('/user?ID=12345');
    // console.log(response);

    //here we will need to get the data from the third party api and that by using the wheather api
    //we will need to concatenate with the city input and then sending the request 
    const apiKey = process.env.WEATHER_API_KEY;
    const baseURL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    const url = `${baseURL}${encodeURIComponent(city)}?unitGroup=metric&contentType=json&key=${apiKey}`;

    const response = await axios.get(url);
    return response.data;

  } catch (error) {
    //there is a very rule that the service throwing the exceptions and the routes which is dealing this 
    throw new Error("Wheather service failed");
  }
}

/*
Redis is an in-memory key-value store.


*/



//and here we will need route to dealing with the front team reuest this is its role and cannot make multiple jobs 
app.get('/weather',async (req,res)=>{
  try {
    //Query parameters are key–value pairs added to the URL.
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        error: "City is required"
      });
    }
    const cacheKey = `weather:${city.toLowerCase()}`;


//and we make it lower case to prevent the duplication from the user inputs 
const start = performance.now();
const cachedData = await redisClient.get(cacheKey);

let weatherData;

if (cachedData) {
  console.log("Cache hit ✅");
  weatherData = JSON.parse(cachedData);
} else {
  console.log("Cache miss ❌");
  weatherData = await getWheather(city);
  await redisClient.setEx(cacheKey, 600, JSON.stringify(weatherData));
}

const end = performance.now();
console.log(`Request took ${(end - start).toFixed(2)} ms`);

return res.status(200).json(weatherData);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: "Failed to fetch weather data"
    });
  }
});

app.listen(PORT,() => {
  console.log('Server is running on http://localhost:8080')
})

//Your cache made the request ~99.6% faster
//If you don’t encode, your fetch request may fail, server may misinterpret the query, and you get errors like City not found.
//and this is a common rule Any user input in a URL query string should always go through encodeURIComponent(). 