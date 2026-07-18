import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    formActive : true,
    setFormActive: (formActive) => set({ formActive }),
    formType: 0,
    setFormType: (formType) => set({ formType }),    
    dayOfTheWeek : '',
    setDayOfTheWeek: (dayOfTheWeek) => set({ dayOfTheWeek }),
    date : '',
    setDate: (date) => set({ date }),
    dateDisplay: '',
    setDateDisplay: (dateDisplay) => set({ dateDisplay }),
    updatedNoteDate: null,
    setUpdatedNoteDate: (updatedNoteDate) => set({ updatedNoteDate }), 
    fetchGet: false,
    setFetchGet: (fetchGet) => set({ fetchGet }),     
}));