import { MetamaskAccessObject } from "./wallet-access-objects/MetamaskAccessObject";

export interface WalletAccessObject {
  handleConnectWallet: () => void;
  handleDisconnectWallet: () => void;
}

export type SupportedWallets = "Metamask";

type WalletAccessObjectAggregatorType = {
  [Wallet in SupportedWallets]: WalletAccessObject;
};

export const walletAccessObject: WalletAccessObjectAggregatorType = {
  Metamask: MetamaskAccessObject,
};
