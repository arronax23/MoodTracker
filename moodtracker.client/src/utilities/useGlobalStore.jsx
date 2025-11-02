import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    formActive : false,
    setFormActive: (formActive) => set({ formActive }),
    dayOfTheWeek : '',
    setDayOfTheWeek: (dayOfTheWeek) => set({ dayOfTheWeek }),
    date : '',
    setDate: (date) => set({ date }),        
}));