import { format, eachDayOfInterval, startOfWeek, addWeeks, addDays, isSameDay } from 'date-fns';
import { pl } from 'date-fns/locale';

export interface DayInfo {
  date: string;
  dateDisplay: string;
  name: string;
  isToday: boolean;
}

export const capitalizeFirstLetter = (val: string): string => {
  if (!val) return '';
  return val.charAt(0).toUpperCase() + val.slice(1);
};

export const getWeek = (weekReference: number): DayInfo[] => {
  const today = new Date();
  const dayReference = addWeeks(today, weekReference);

  const weekStart = startOfWeek(dayReference, { weekStartsOn: 1 });
  const days = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  return days.map((day) => ({
    date: format(day, 'yyyy-MM-dd'),
    dateDisplay: format(day, 'dd.MM.yyyy'),
    name: capitalizeFirstLetter(format(day, 'EEEE', { locale: pl })),
    isToday: isSameDay(day, today),
  }));
};

export const getFirstDayOfCurrentMonth = (): Date => {
  const today = new Date();
  today.setDate(1);
  return today;
};

export const incrementMonth = (date: Date): Date => {
  const newDate = new Date(date.getTime());
  newDate.setMonth(newDate.getMonth() + 1);
  return newDate;
};

export const decrementMonth = (date: Date): Date => {
  const newDate = new Date(date.getTime());
  newDate.setMonth(newDate.getMonth() - 1);
  return newDate;
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getLocalTime = (): string => {
  return format(new Date(), 'HH:mm', { locale: pl });
};