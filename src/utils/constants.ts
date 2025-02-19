import { Network } from "aftermath-ts-sdk";

export const AFTERMATH_CONFIG = {
  NETWORK: Network.MAINNET,
};

export const ROUTES = {
  HOME: "/",
  SWAP: "/swap",
  POOLS: "/pools",
  FARMS: "/farms",
};

export const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0, 5.0];
export const DEFAULT_SLIPPAGE = 0.5;
