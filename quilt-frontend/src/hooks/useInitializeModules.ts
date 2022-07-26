import { useCallback, useEffect } from "react";
import { ethers } from "ethers";
import Gun from "gun";

import { useContracts } from "../stores/useContracts";
import { useGunConnection } from "../stores/useGunConnection";
import { useProvider } from "../stores/useProvider";

import { gunDbAddress } from "../constants/gundb";
import { CONTRACT_ADDRESS_POLYGON } from "../constants/contractConstants";
import { KeyStorage } from "../ABI/typechain/KeyStorage";
import ContractData from "../ABI/KeyStorage.json";

export const useInitializeModules = () => {
  const provider = useProvider((state) => state.provider);
  const setContract = useContracts((state) => state.setContract);
  const setGunConnection = useGunConnection((state) => state.setGunConnection);

  const initializeConctractInstance = useCallback(() => {
    if (!(CONTRACT_ADDRESS_POLYGON && provider)) {
      return new Error("Failed to connect to the contract");
    }

    setContract(
      new ethers.Contract(
        CONTRACT_ADDRESS_POLYGON,
        ContractData.abi,
        provider.getSigner()
      ) as KeyStorage
    );
  }, [provider, setContract]);

  const initializeGunConnection = useCallback(() => {
    require("gun/sea");

    const gun = Gun({
      peers: [gunDbAddress],
    });

    setGunConnection(gun);
  }, [setGunConnection]);

  useEffect(() => {
    initializeConctractInstance();
    initializeGunConnection();
  }, [initializeConctractInstance, initializeGunConnection]);
};
