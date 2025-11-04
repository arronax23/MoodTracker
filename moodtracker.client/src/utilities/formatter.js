export const handleMoodRateDisplay = (moodRate) => (isNull(moodRate) ? '-' : moodRate);

const isNull = (value) => value === null || value === undefined;