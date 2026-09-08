import { create } from "zustand";

export interface GlobalState {
  formActive: boolean;
  setFormActive: (formActive: boolean) => void;
  formType: number;
  setFormType: (formType: number) => void;
  dayOfTheWeek: string;
  setDayOfTheWeek: (dayOfTheWeek: string) => void;
  date: string;
  setDate: (date: string) => void;
  dateDisplay: string;
  setDateDisplay: (dateDisplay: string) => void;
  updatedNoteDate: string | null;
  setUpdatedNoteDate: (updatedNoteDate: string | null) => void;
  fetchGet: boolean;
  setFetchGet: (fetchGet: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  formActive: true,
  setFormActive: (formActive) => set({ formActive }),
  formType: 0,
  setFormType: (formType) => set({ formType }),
  dayOfTheWeek: "",
  setDayOfTheWeek: (dayOfTheWeek) => set({ dayOfTheWeek }),
  date: "",
  setDate: (date) => set({ date }),
  dateDisplay: "",
  setDateDisplay: (dateDisplay) => set({ dateDisplay }),
  updatedNoteDate: null,
  setUpdatedNoteDate: (updatedNoteDate) => set({ updatedNoteDate }),
  fetchGet: false,
  setFetchGet: (fetchGet) => set({ fetchGet }),
}));