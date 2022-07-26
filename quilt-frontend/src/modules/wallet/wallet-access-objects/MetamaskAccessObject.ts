import { ethers } from "ethers";
import { toast } from "react-toastify";
import { networks, AvailableNetworks } from "../../../constants/networks";
import { WalletAccessObject } from "../walletAccessObject";

export const MetamaskAccessObject: WalletAccessObject = {
  handleConnectWallet: async () => {
    try {
      if (!window.ethereum) throw new Error("Cannot find MetaMask");

      // Switch networks
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[AvailableNetworks.POLYGON],
          },
        ],
      });

      // Set up wallet
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      if (!signer) throw new Error("Metamask is not connected");

      //login(address);
      //setProvider(provider);
    } catch (error: any) {
      toast.error(error.message);
    }
  },
  handleDisconnectWallet: () => {
    //logout();
  },
};
