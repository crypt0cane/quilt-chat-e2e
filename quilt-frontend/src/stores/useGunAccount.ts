import create from "zustand";

interface useGunAccountStore {
  username: string;
  isLogged: boolean;
  setUsername: (newUsername: string) => void;
  setIsLogged: (isLogged: boolean) => void;
}

export const useGunAccount = create<useGunAccountStore>((set) => ({
  username: "",
  isLogged: false,
  setUsername: (newUsername: string) => set({ username: newUsername }),
  setIsLogged: (isLogged: boolean) => set({ isLogged }),
}));
