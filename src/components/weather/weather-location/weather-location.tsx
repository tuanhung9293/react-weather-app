import React, { useState, useRef } from 'react';
import { Box, Text } from 'rebass';
import { Input } from '@rebass/forms';
import { TLocation } from 'models/app.model';
import appAPI from 'apis/app.api';
import { useDebouncedEffect } from 'hooks/useDebouceEffect';
import { useClickOutsideEffect } from 'hooks/useClickOutsideEffect';

type TProps = {
    debounceTime: number;
    onSetLocation: (location: TLocation) => Promise<void>;
}

export function WeatherLocation({ debounceTime, onSetLocation }: TProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState<string>('');
    const [locationList, setLocationList] = useState<TLocation[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);

    const searchEffect = async () => {
        if (search.length < 2) return;

        setSearching(true);
        const list = await appAPI.searchLocation(search);
        setSearching(false);
        setLocationList(list);
    }

    useDebouncedEffect(searchEffect, debounceTime, [search]);
    useClickOutsideEffect(wrapperRef, () => setDisplay(false));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSelectLocation = (location: TLocation) => {
        setSearch(location.title);
        setDisplay(false);

        onSetLocation(location);
    }

    return (
        <Box
            ref={wrapperRef}
            width={[1, 1, 1 / 2, 2 / 5]}
            sx={{
                position: 'relative',
            }}
            data-testid='weather-location'
        >
            <Input
                type='text'
                bg='white'
                onFocus={() => setDisplay(true)}
                onChange={handleChange}
                value={search}
                placeholder='Search city'
                data-testid='location-input'
            />
            {display &&
                <Box
                    bg='bg_primary'
                    width={1}
                    sx={{
                        position: 'absolute'
                    }}
                >
                    {searching ?
                        <Text my={2} textAlign='center' color='secondary' data-testid='searching'>Searching...</Text>
                        :
                        (locationList.length === 0 ?
                            <Text my={2} textAlign='center' color='primary' fontWeight='bold' data-testid='no-result'>No result</Text>
                            :
                            (locationList.map(location =>
                                <Text
                                    key={location.woeid}
                                    px={2}
                                    py={1}
                                    color='primary'
                                    sx={{
                                        ':hover': {
                                            backgroundColor: 'bg_secondary',
                                        }
                                    }}
                                    onClick={() => handleSelectLocation(location)}
                                    tabIndex={0}
                                    data-testid='search-item'
                                >
                                    {location.title}
                                </Text>
                            ))
                        )
                    }
                </Box>
            }
        </Box>
    );
}
