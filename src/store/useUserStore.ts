import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface tokenState {
  user:
    | {
        displayName?: string;
        email: string;
        uid: string;
        username?: string;
      }
    | undefined;
  setUser: (user: any) => void;
}

export const useUserStore = create<tokenState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        // setUser: (user: any) => set(user),
        setUser: (user: any) => set(() => ({ user })),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
