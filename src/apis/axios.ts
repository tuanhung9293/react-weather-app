import axios from 'axios';

export const  axiosInstance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location',
})
