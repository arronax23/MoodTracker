export type ColorName = "Green" | "Yellow" | "Red" | string;

export interface Note {
  id: number;
  date: string;
  medications: MedicationItem[];
  thoughts: ThoughtItem[];
  mood?: Mood | null;
}

export interface Dose {
  value: number;
  unit: string;
}

export interface MedicationItem {
  id: number;
  time: string;
  name: string;
  dose: Dose;
}

export interface ThoughtItem {
  id: number;
  time: string;
  text: string;
}

export interface Mood {
  rate: number;
  color: ColorName;
}