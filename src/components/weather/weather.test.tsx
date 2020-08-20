import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Weather } from './weather';

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

it('should Weather be rendered', () => {
    act(() => {
        render(
            <Weather />,
            container);
    });

    const getAllWeatherLocation = () => container?.querySelectorAll('input[data-testid="location-input"]');
    const getAllWeatherForecast = () => container?.querySelectorAll('[data-testid="weather-forecast"]');

    expect(getAllWeatherLocation()!.length).toEqual(1);
    expect(getAllWeatherForecast()!.length).toEqual(1);
});
