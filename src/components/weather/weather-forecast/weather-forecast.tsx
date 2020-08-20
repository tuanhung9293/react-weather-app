import React from 'react';
import { Flex, Box, Text, Card } from 'rebass';
import { TWeatherInfo } from 'models/app.model';
import { stringToWeekDay } from 'utils/date-time.util';

type TProps = {
    weatherList: TWeatherInfo[];
    weatherLoading: boolean;
}

export function WeatherForecast({ weatherList, weatherLoading }: TProps) {
    return (
        <Card
            mt={9}
            p={4}
            bg='white'
            sx={{
                boxShadow: 'main'
            }}
            data-testid='weather-forecast'
        >
            {weatherLoading ?
                <Text textAlign='center' color='secondary'>Loading forecast...</Text>
                :
                <Flex
                    m={-2}
                    flexWrap='wrap'
                >
                    {weatherList.length === 0 ?
                        <Text textAlign='center' width={1} my={2} color='secondary'>The weather forecast in 5 days</Text>
                        :
                        (weatherList.map(weather =>
                            <Box
                                key={weather.id}
                                p={2}
                                width={[1, 1 / 2, 1 / 3, 1 / 5]}
                            >
                                <Box
                                    px={3}
                                    py={5}
                                    color='white'
                                    bg='primary'
                                    sx={{ borderRadius: '4px' }}
                                >
                                    <Text textAlign='center' mb={3} data-testid='week-day'>{stringToWeekDay(weather.applicable_date)}</Text>
                                    <Text textAlign='center' data-testid='min-temp'>Min: {weather.min_temp.toFixed(2)}</Text>
                                    <Text textAlign='center' data-testid='max-temp'>Max: {weather.max_temp.toFixed(2)}</Text>
                                </Box>
                            </Box>
                        ))
                    }
                </Flex>
            }
        </Card>
    );
}
