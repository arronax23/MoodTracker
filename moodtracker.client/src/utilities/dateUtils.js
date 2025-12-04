import { format, eachDayOfInterval, startOfWeek, addWeeks, addDays } from 'date-fns';
import { pl } from 'date-fns/locale';

export const getWeek = (weekReference) => {
    console.log('weekReference', weekReference);
    const today = new Date();
    const dayReference = addWeeks(today, weekReference)

    const weekStart = startOfWeek(dayReference, { weekStartsOn: 1 });
    const days = eachDayOfInterval({
        start: weekStart,
        end: addDays(weekStart, 6)
    });

    const daysWithNames = days.map(day => ({
        date: format(day, 'yyyy-MM-dd'),
        dateDisplay: format(day, 'dd.MM.yyyy'),
        name: capitalizeFirstLetter(format(day, 'EEEE', { locale: pl })),
        isToday: day.getDate() == today.getDate()
    }));

    return daysWithNames;
}


export const getFirstDayOfCurrentMonth = () => {
     const today = new Date();
     today.setDate(1);

     return today;
}

export const incrementMonth = (date) => {
    const newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() + 1)

    return newDate;
}

export const decrementMonth = (date) => {
    const newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() - 1)

    return newDate;
}

export const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
}


export const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}