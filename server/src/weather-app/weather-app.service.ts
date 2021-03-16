import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from 'dotenv';

@Injectable()
export class WeatherAppService {
    async actionCurrentTempIs(params) {
        const city = params['1'];
        const tempCompare = params['2'];

        const tempCity = await axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&units=metric`,
                {},
            )
            .then((response) => {
                return response.data.main.temp;
            })
            .catch((error) => console.log(error));

        if (tempCity >= tempCompare) return true;
        return false;
    }

    async actionCurrentTempFeelsLikeIs(params) {
        const city = params['1'];
        const tempCompare = params['2'];

        const tempCity = await axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&units=metric`,
                {},
            )
            .then((response) => {
                return response.data.main.feels_like;
            })
            .catch((error) => console.log(error));

        if (tempCity >= tempCompare) return true;
        return false;
    }

    async actionCurrentHumidityIs(params) {
        const city = params['1'];
        const humidityCompare = params['2'];
        const humidityCity = await axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&units=metric`,
                {},
            )
            .then((response) => {
                return response.data.main.humidity;
            })
            .catch((error) => console.log(error));

        if (humidityCity >= humidityCompare) return true;
        return false;
    }

    async actionCurrentWindIs(params) {
        const city = params['1'];
        const windCompare = params['2'];

        const windCity = await axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&units=metric`,
                {},
            )
            .then((response) => {
                return response.data.wind.speed;
            })
            .catch((error) => console.log(error));

        if (windCity >= windCompare) return true;
        return false;
    }
}
