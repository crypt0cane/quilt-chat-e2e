import create from "zustand";

interface UserDataStore {
  isLogged: boolean;
  address: string;
  login: (address: string) => void;
  logout: () => void;
}

export const useUserData = create<UserDataStore>((set) => ({
  isLogged: false,
  address: "",
  login: (address: string) => set({ address, isLogged: true }),
  logout: () => set({ address: "", isLogged: false }),
}));
