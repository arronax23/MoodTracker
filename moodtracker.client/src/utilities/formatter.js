export const handleMoodRateDisplay = (mood) => (isNull(mood) ? '-' : mood.rate);

const isNull = (value) => value === null || value === undefined;