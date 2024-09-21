import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ReportState {
  value: number;
  increase: (by: number) => void;
}

export const useReportStore = create<ReportState>()(
  devtools(
    persist(
      (set) => ({
        value: 0,
        increase: (by) => set((state) => ({ value: state.value + by })),
      }),
      {
        name: "bear-storage",
      },
    ),
  ),
);
