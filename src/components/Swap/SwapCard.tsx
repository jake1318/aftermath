import { useState, useEffect } from "react";
import styled from "styled-components";
import { useWallet } from "@mysten/dapp-kit";
import Button from "../common/Button";
import Input from "../common/Input";
import { useTokens } from "../../hooks/useTokens";
import { useSwap } from "../../hooks/useSwap";
import { DEFAULT_SLIPPAGE } from "../../utils/constants";
import Loading from "../common/Loading";

const SwapCardWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
  max-width: 480px;
  width: 100%;
`;

const TokenInput = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const TokenSelect = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const SwapDetails = styled.div`
  margin: ${(props) => props.theme.spacing.md} 0;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  margin-top: ${(props) => props.theme.spacing.sm};
  font-size: 14px;
`;

const SwapCard = () => {
  const { connected } = useWallet();
  const { tokens, loading: tokensLoading } = useTokens();
  const { getQuote, executeSwap, loading, error } = useSwap();
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      if (!fromToken || !toToken || !fromAmount || Number(fromAmount) <= 0) {
        setQuote(null);
        setToAmount("");
        return;
      }

      try {
        const quoteResult = await getQuote({
          coinInType: fromToken,
          coinOutType: toToken,
          amount: fromAmount,
        });
        setQuote(quoteResult);
        setToAmount(quoteResult.amountOut.toString());
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuote();
  }, [fromToken, toToken, fromAmount]);

  const handleSwap = async () => {
    if (!quote || !fromToken || !toToken || !connected) return;

    try {
      await executeSwap({
        coinInType: fromToken,
        coinOutType: toToken,
        amount: fromAmount,
        slippage: DEFAULT_SLIPPAGE,
      });

      // Reset form after successful swap
      setFromAmount("");
      setToAmount("");
      setQuote(null);
    } catch (err) {
      console.error("Swap failed:", err);
    }
  };

  if (tokensLoading) return <Loading />;

  return (
    <SwapCardWrapper>
      <TokenInput>
        <TokenSelect
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
        >
          <option value="">Select token</option>
          {tokens.map((token) => (
            <option key={token.type} value={token.type}>
              {token.symbol}
            </option>
          ))}
        </TokenSelect>
        <Input
          type="number"
          placeholder="0.0"
          value={fromAmount}
          onChange={(e) => setFromAmount(e.target.value)}
          min="0"
        />
      </TokenInput>

      <TokenInput>
        <TokenSelect
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
        >
          <option value="">Select token</option>
          {tokens.map((token) => (
            <option key={token.type} value={token.type}>
              {token.symbol}
            </option>
          ))}
        </TokenSelect>
        <Input type="number" placeholder="0.0" value={toAmount} readOnly />
      </TokenInput>

      {quote && (
        <SwapDetails>
          <DetailRow>
            <span>Price Impact:</span>
            <span>{(quote.priceImpact * 100).toFixed(2)}%</span>
          </DetailRow>
          <DetailRow>
            <span>Minimum Received:</span>
            <span>{quote.minimumReceived}</span>
          </DetailRow>
          <DetailRow>
            <span>Slippage Tolerance:</span>
            <span>{DEFAULT_SLIPPAGE}%</span>
          </DetailRow>
        </SwapDetails>
      )}

      <Button
        onClick={handleSwap}
        disabled={!connected || loading || !quote}
        fullWidth
      >
        {!connected ? "Connect Wallet" : loading ? "Swapping..." : "Swap"}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SwapCardWrapper>
  );
};

export default SwapCard;
