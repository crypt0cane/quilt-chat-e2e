import create from "zustand";
import { KeyStorage } from "../ABI/typechain/KeyStorage";

interface ContractStore {
  contract: KeyStorage | undefined;
  setContract: (contractInstance: KeyStorage) => void;
}

export const useContracts = create<ContractStore>((set) => ({
  contract: undefined,
  setContract: (contractInstance: KeyStorage) =>
    set(() => ({ contract: contractInstance })),
}));
