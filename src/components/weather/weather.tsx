import React, { useState } from 'react';
import { Box } from 'rebass';
import appAPI from 'apis/app.api';
import { TWeatherInfo, TLocation } from 'models/app.model';
import { WeatherLocation } from './weather-location/weather-location';
import { WeatherForecast } from './weather-forecast/weather-forecast';

export function Weather() {
    const [weatherList, setWeatherList] = useState<TWeatherInfo[]>([]);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

    const setLocation = async (location: TLocation) => {
        setWeatherLoading(true);
        const weathers = await appAPI.loadForecast(location.woeid);
        setWeatherLoading(false);

        setWeatherList(weathers);
    }

    return (
        <Box
            py={8}
            mx={[4, 6, 8, 12]}
        >
            <WeatherLocation
                debounceTime={350}
                onSetLocation={setLocation}
            />
            <WeatherForecast
                weatherList={weatherList}
                weatherLoading={weatherLoading}
            />
        </Box>
    );
}
