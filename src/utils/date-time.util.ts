const gsDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const stringToWeekDay = (dateJSON: string) => gsDayNames[new Date(dateJSON).getDay()] || '';
