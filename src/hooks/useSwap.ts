import { useState } from "react";
import { useAftermath } from "../contexts/AftermathContext";
import { useWallet } from "@mysten/dapp-kit";
import { SwapParams } from "aftermath-ts-sdk/dist/types";

export const useSwap = () => {
  const aftermath = useAftermath();
  const { signAndExecuteTransactionBlock } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuote = async (params: SwapParams) => {
    try {
      return await aftermath.Router.getQuote(params);
    } catch (err) {
      console.error("Error getting quote:", err);
      throw err;
    }
  };

  const executeSwap = async (params: SwapParams) => {
    setLoading(true);
    setError(null);

    try {
      const tx = await aftermath.Router.createSwapTransaction(params);

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      return result;
    } catch (err) {
      console.error("Swap failed:", err);
      setError(err instanceof Error ? err.message : "Swap failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getQuote,
    executeSwap,
    loading,
    error,
  };
};
