import { IGunChainReference } from "gun/types/chain";

export type GunConnectionType = IGunChainReference<any, any, "pre_root">;
export type GunUser = IGunChainReference<Record<string, any>, any, false>;
