import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { WeatherLocation } from './weather-location';
import appAPI from 'apis/app.api';

const DEBOUNCE_TIME_MOCK = 30;
const API_TIME_MOCK = 50;

const locationsMock = [
    {
        "title": "San Francisco",
        "woeid": 2487956,
    },
    {
        "title": "San Diego",
        "woeid": 2487889,
    },
    {
        "title": "San Jose",
        "woeid": 2488042,
    },
    {
        "title": "San Antonio",
        "woeid": 2487796,
    }
]

appAPI.searchLocation = jest.fn(async (_: string) => {
    await new Promise(resolve => setTimeout(resolve, API_TIME_MOCK));
    return locationsMock;
});

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

it('should WeatherLocation perform behaviors correctly', async () => {
    const onSetLocation = jest.fn();

    act(() => {
        render(
            <WeatherLocation
                debounceTime={DEBOUNCE_TIME_MOCK}
                onSetLocation={onSetLocation}
            />,
            container);
    });

    const getInput = () => container?.querySelector('input[data-testid="location-input"]');
    const getAllSearching = () => container?.querySelectorAll('div[data-testid="searching"]');
    const getAllNoResult = () => container?.querySelectorAll('div[data-testid="no-result"]');
    const getAllSearchItem = () => container?.querySelectorAll('div[data-testid="search-item"]');

    // [No Result] will be displayed when focus
    expect(getAllNoResult()!.length).toEqual(0);
    act(() => {
        getInput()!.dispatchEvent(new Event('focus', { bubbles: true }));
    });
    expect(getAllNoResult()!.length).toEqual(1);

    // API will not be called soon, it should wait for debounce
    getInput()!.setAttribute('value', 'abc');
    act(() => {
        getInput()!.dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(appAPI.searchLocation).not.toHaveBeenCalled();

    // after debounce time run out, API will be called and display [Searching...]
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, DEBOUNCE_TIME_MOCK));
    });
    expect(appAPI.searchLocation).toHaveBeenCalledWith('abc');
    expect(getAllSearching()!.length).toEqual(1);

    // API respond after a while, and the page will display the results
    expect(getAllSearchItem()!.length).toEqual(0);
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, API_TIME_MOCK));
    });
    expect(getAllSearchItem()!.length).toEqual(4);

    // props.onSetLocation will be called when click on it
    act(() => {
        getAllSearchItem()![0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onSetLocation).toHaveBeenCalledTimes(1);
    expect(onSetLocation).toBeCalledWith(locationsMock[0]);
});
