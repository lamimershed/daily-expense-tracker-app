import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface tokenState {
  token: string | undefined;
  setToken: (token: string) => void;
  centerCode: string | undefined;
  setCenterCode: (centerCode: string | undefined) => void;
}

export const useUserStore = create<tokenState>()(
  devtools(
    persist(
      (set) => ({
        token: undefined,
        setToken: (value: string) => set(() => ({ token: value })),
        centerCode: undefined,
        setCenterCode: (value: string | undefined) =>
          set(() => ({ centerCode: value })),
      }),
      {
        name: "user-storage",
      },
    ),
  ),
);
