import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { WeatherForecast } from './weather-forecast';
import { stringToWeekDay } from 'utils/date-time.util';

const forecastMock = [
    {
        "id": 5425408793116672,
        "applicable_date": "2020-08-12",
        "min_temp": 26.0,
        "max_temp": 38.1
    },
    {
        "id": 5661755676033024,
        "applicable_date": "2020-08-13",
        "min_temp": 24.7,
        "max_temp": 38.8
    },
    {
        "id": 6263592531787776,
        "applicable_date": "2020-08-14",
        "min_temp": 24.4,
        "max_temp": 39.0
    },
    {
        "id": 4993400245846016,
        "applicable_date": "2020-08-15",
        "min_temp": 24.5,
        "max_temp": 39.5
    },
    {
        "id": 5569399316545536,
        "applicable_date": "2020-08-16",
        "min_temp": 24.2,
        "max_temp": 39.7
    }
];

let container: HTMLDivElement | null = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container!);
    container!.remove();
    container = null;
});

it('should WeatherForecast render [Loading forecast...]', () => {
    act(() => {
        render(
            <WeatherForecast
                weatherList={[]}
                weatherLoading={true}
            />,
            container);
    });
    expect(container?.textContent).toEqual('Loading forecast...');

    act(() => {
        render(
            <WeatherForecast
                weatherList={forecastMock}
                weatherLoading={true}
            />,
            container);
    });
    expect(container?.textContent ?? '').toEqual('Loading forecast...');
});

it('should WeatherForecast render data correctly', () => {
    act(() => {
        render(
            <WeatherForecast
                weatherList={[]}
                weatherLoading={false}
            />,
            container);
    });
    expect(container?.textContent).toEqual('The weather forecast in 5 days');

    act(() => {
        render(
            <WeatherForecast
                weatherList={forecastMock}
                weatherLoading={false}
            />,
            container);
    });
    expect(container?.querySelectorAll('[data-testid="week-day"]')[0]?.textContent).toEqual(stringToWeekDay(forecastMock[0].applicable_date));
    expect(container?.querySelectorAll('[data-testid="week-day"]')[4]?.textContent).toEqual(stringToWeekDay(forecastMock[4].applicable_date));
    expect(container?.querySelectorAll('[data-testid="min-temp"]')[4]?.textContent).toEqual(`Min: ${forecastMock[4].min_temp.toFixed(2)}`);
    expect(container?.querySelectorAll('[data-testid="max-temp"]')[4]?.textContent).toEqual(`Max: ${forecastMock[4].max_temp.toFixed(2)}`);
});