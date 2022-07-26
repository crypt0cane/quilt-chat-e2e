import { IGunChainReference } from "gun/types/chain";
import create from "zustand";
import { GunConnectionType } from "../types/gun/GunTypes";

interface useGunConnectionStore {
  gun: GunConnectionType | undefined;
  gunUser: IGunChainReference<Record<string, any>, any, false> | undefined;
  setGunConnection: (connection: GunConnectionType) => void;
}

export const useGunConnection = create<useGunConnectionStore>((set) => ({
  gun: undefined,
  gunUser: undefined,
  setGunConnection: (connection: GunConnectionType) => {
    const user = connection.user().recall({ sessionStorage: true });
    set({ gun: connection, gunUser: user });
  },
}));
