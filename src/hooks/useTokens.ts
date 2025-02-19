import { useState, useEffect } from "react";
import { useAftermath } from "../contexts/AftermathContext";
import { TokenData } from "aftermath-ts-sdk/dist/types";

export const useTokens = () => {
  const aftermath = useAftermath();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    try {
      const tokenList = await aftermath.Token.getTokens();
      setTokens(tokenList);
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError("Failed to fetch tokens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return { tokens, loading, error, refreshTokens: fetchTokens };
};
