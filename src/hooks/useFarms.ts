import { useState, useEffect } from "react";
import { useAftermath } from "../contexts/AftermathContext";
import { useWallet } from "@mysten/dapp-kit";
import type { Farm, UserPosition } from "../utils/types";

export const useFarms = () => {
  const aftermath = useAftermath();
  const { signAndExecuteTransactionBlock } = useWallet();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = async () => {
    setLoading(true);
    try {
      const farmsData = await aftermath.Farm.getFarms();
      setFarms(farmsData);
    } catch (err) {
      console.error("Error fetching farms:", err);
      setError("Failed to fetch farms");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPositions = async (walletAddress: string) => {
    try {
      const positions = await aftermath.Farm.getUserPositions(walletAddress);
      setUserPositions(positions);
    } catch (err) {
      console.error("Error fetching user positions:", err);
      setError("Failed to fetch user positions");
    }
  };

  const stake = async (params: { farmId: string; amount: string }) => {
    try {
      const tx = await aftermath.Farm.createStakeTransaction(params);

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      return result;
    } catch (err) {
      console.error("Staking failed:", err);
      throw err;
    }
  };

  const unstake = async (params: { farmId: string; amount: string }) => {
    try {
      const tx = await aftermath.Farm.createUnstakeTransaction(params);

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      return result;
    } catch (err) {
      console.error("Unstaking failed:", err);
      throw err;
    }
  };

  const harvest = async (farmId: string) => {
    try {
      const tx = await aftermath.Farm.createHarvestTransaction({ farmId });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      return result;
    } catch (err) {
      console.error("Harvest failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return {
    farms,
    userPositions,
    loading,
    error,
    stake,
    unstake,
    harvest,
    fetchFarms,
    fetchUserPositions,
  };
};
