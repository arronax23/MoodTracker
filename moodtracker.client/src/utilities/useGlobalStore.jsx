import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    formActive : false,
    setFormActive: (formActive) => set({ formActive }),
    formType: 0,
    setFormType: (formType) => set({ formType }),    
    dayOfTheWeek : '',
    setDayOfTheWeek: (dayOfTheWeek) => set({ dayOfTheWeek }),
    date : '',
    setDate: (date) => set({ date }),
    dateDisplay: '',
    setDateDisplay: (dateDisplay) => set({ dateDisplay }),
    updateNoteDate: null,
    setUpdateNoteDate: (updateNoteDate) => set({ updateNoteDate }), 
}));