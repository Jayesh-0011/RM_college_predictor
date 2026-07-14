import { create } from "zustand";

type StateStore = {
  selectedStates: string[];
  toggleState: (state: string) => void;
};

export const useStateStore = create<StateStore>((set) => ({
  selectedStates: [],

  toggleState: (state) =>
    set((store) => ({
      selectedStates: store.selectedStates.includes(state)
        ? store.selectedStates.filter((x) => x !== state)
        : [...store.selectedStates, state],
    })),
}));