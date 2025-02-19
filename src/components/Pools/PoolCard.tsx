import { useState } from "react";
import styled from "styled-components";
import { useWallet } from "@mysten/dapp-kit";
import Button from "../common/Button";
import Input from "../common/Input";
import type { Pool } from "../../utils/types";
import { usePools } from "../../hooks/usePools";

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
`;

const Title = styled.h3`
  margin: 0 0 ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Stat = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const StatValue = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: bold;
`;

const InputGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 14px;
  margin-top: ${(props) => props.theme.spacing.sm};
`;

interface PoolCardProps {
  pool: Pool;
}

const PoolCard = ({ pool }: PoolCardProps) => {
  const { connected } = useWallet();
  const { addLiquidity, removeLiquidity } = usePools();
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddLiquidity = async () => {
    if (!connected || !amount0 || !amount1) return;
    setError(null);
    setLoading(true);

    try {
      await addLiquidity({
        poolId: pool.id,
        amount0,
        amount1,
      });
      setAmount0("");
      setAmount1("");
    } catch (err) {
      setError("Failed to add liquidity");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLiquidity = async (lpAmount: string) => {
    if (!connected || !lpAmount) return;
    setError(null);
    setLoading(true);

    try {
      await removeLiquidity({
        poolId: pool.id,
        lpAmount,
      });
    } catch (err) {
      setError("Failed to remove liquidity");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>
        {pool.token0.symbol}/{pool.token1.symbol}
      </Title>

      <Stats>
        <Stat>
          <StatLabel>TVL</StatLabel>
          <StatValue>
            $
            {(
              Number(pool.reserve0) * Number(pool.token0.price) +
              Number(pool.reserve1) * Number(pool.token1.price)
            ).toFixed(2)}
          </StatValue>
        </Stat>
        <Stat>
          <StatLabel>APR</StatLabel>
          <StatValue>{pool.apr.toFixed(2)}%</StatValue>
        </Stat>
        <Stat>
          <StatLabel>{pool.token0.symbol} Reserve</StatLabel>
          <StatValue>{Number(pool.reserve0).toFixed(6)}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>{pool.token1.symbol} Reserve</StatLabel>
          <StatValue>{Number(pool.reserve1).toFixed(6)}</StatValue>
        </Stat>
      </Stats>

      <InputGroup>
        <InputLabel>{pool.token0.symbol} Amount</InputLabel>
        <Input
          type="number"
          value={amount0}
          onChange={(e) => setAmount0(e.target.value)}
          placeholder="0.0"
          min="0"
        />
      </InputGroup>

      <InputGroup>
        <InputLabel>{pool.token1.symbol} Amount</InputLabel>
        <Input
          type="number"
          value={amount1}
          onChange={(e) => setAmount1(e.target.value)}
          placeholder="0.0"
          min="0"
        />
      </InputGroup>

      <Button
        onClick={handleAddLiquidity}
        disabled={!connected || loading || !amount0 || !amount1}
        fullWidth
      >
        {!connected
          ? "Connect Wallet"
          : loading
          ? "Adding Liquidity..."
          : "Add Liquidity"}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Card>
  );
};

export default PoolCard;
