import { IPFS } from "ipfs-core/src";

declare global {
  interface Window {
    ipfs: IPFS;
    ethereum: any;
  }
}

window.ipfs = window.ipfs || {};
