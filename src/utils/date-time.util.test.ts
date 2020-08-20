import { stringToWeekDay } from './date-time.util';

it('should stringToWeekDay return correct week day for valid dateJSON', () => {
    expect(stringToWeekDay('2015-03-25')).toEqual('Wednesday');
    expect(stringToWeekDay('03/25/2015')).toEqual('Wednesday');
    expect(stringToWeekDay('Mar 25 2015')).toEqual('Wednesday');
    expect(stringToWeekDay('2015-03-27')).toEqual('Friday');
})

it('should stringToWeekDay return empty string for invalid dateJSON', () => {
    expect(stringToWeekDay('invalid dateJSON')).toEqual('');
    expect(stringToWeekDay('2015-13-30')).toEqual('');
})