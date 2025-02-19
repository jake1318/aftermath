import { TokenData } from "aftermath-ts-sdk/dist/types";

export interface SwapQuote {
  amountIn: bigint;
  amountOut: bigint;
  priceImpact: number;
  route: string[];
  minimumReceived: string;
}

export interface Pool {
  id: string;
  token0: TokenData;
  token1: TokenData;
  reserve0: bigint;
  reserve1: bigint;
  apr: number;
  fee: number;
}

export interface Farm {
  id: string;
  pool: Pool;
  rewardToken: TokenData;
  totalStaked: bigint;
  apr: number;
  rewardsPerDay: bigint;
}

export interface UserPosition {
  farmId: string;
  stakedAmount: bigint;
  pendingRewards: bigint;
}

export interface Theme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
}
