import { ethers } from "ethers";
import create from "zustand";

interface ProviderStore {
  provider: ethers.providers.Web3Provider | undefined;
  setProvider: (newProvider: ethers.providers.Web3Provider) => void;
}

export const useProvider = create<ProviderStore>((set) => ({
  provider: undefined,
  setProvider: (newProvider: ethers.providers.Web3Provider) =>
    set({ provider: newProvider }),
}));
