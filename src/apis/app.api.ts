import { TLocation, TWeatherInfo } from 'models/app.model';
import { axiosInstance } from './axios';

const searchLocation = async (key: string): Promise<TLocation[]> => {
    const res = await axiosInstance.get('/search', { params: { query: key } });
    return res.data;
}

const loadForecast = async (woeid: number): Promise<TWeatherInfo[]> => {
    const res = await axiosInstance.get(`/location/${woeid}`);
    return res.data.consolidated_weather.slice(1);
}

const appAPI = {
    searchLocation,
    loadForecast,
};

export default appAPI;
