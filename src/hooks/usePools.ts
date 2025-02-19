import { useState, useEffect } from "react";
import { useAftermath } from "../contexts/AftermathContext";
import { useWallet } from "@mysten/dapp-kit";
import type { Pool } from "../utils/types";

export const usePools = () => {
  const aftermath = useAftermath();
  const { signAndExecuteTransactionBlock } = useWallet();
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPools = async () => {
    setLoading(true);
    try {
      const poolsData = await aftermath.Pool.getPools();
      setPools(poolsData);
    } catch (err) {
      console.error("Error fetching pools:", err);
      setError("Failed to fetch pools");
    } finally {
      setLoading(false);
    }
  };

  const addLiquidity = async (params: {
    poolId: string;
    amount0: string;
    amount1: string;
  }) => {
    try {
      const tx = await aftermath.Pool.createAddLiquidityTransaction(params);

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      await fetchPools();
      return result;
    } catch (err) {
      console.error("Error adding liquidity:", err);
      throw err;
    }
  };

  const removeLiquidity = async (params: {
    poolId: string;
    lpAmount: string;
  }) => {
    try {
      const tx = await aftermath.Pool.createRemoveLiquidityTransaction(params);

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      await fetchPools();
      return result;
    } catch (err) {
      console.error("Error removing liquidity:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return {
    pools,
    loading,
    error,
    addLiquidity,
    removeLiquidity,
    refreshPools: fetchPools,
  };
};
