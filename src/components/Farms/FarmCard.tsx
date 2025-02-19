import { useState } from "react";
import styled from "styled-components";
import { useWallet } from "@mysten/dapp-kit";
import Button from "../common/Button";
import Input from "../common/Input";
import type { Farm } from "../../utils/types";
import { useFarms } from "../../hooks/useFarms";

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

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 14px;
  margin-top: ${(props) => props.theme.spacing.sm};
`;

interface FarmCardProps {
  farm: Farm;
}

const FarmCard = ({ farm }: FarmCardProps) => {
  const { connected } = useWallet();
  const { stake, unstake, harvest, userPositions } = useFarms();
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userPosition = userPositions.find((p) => p.farmId === farm.id);
  const pendingRewards = userPosition ? userPosition.pendingRewards : BigInt(0);

  const handleStake = async () => {
    if (!connected || !stakeAmount) return;
    setError(null);
    setLoading(true);

    try {
      await stake({
        farmId: farm.id,
        amount: stakeAmount,
      });
      setStakeAmount("");
    } catch (err) {
      setError("Failed to stake");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!connected || !unstakeAmount) return;
    setError(null);
    setLoading(true);

    try {
      await unstake({
        farmId: farm.id,
        amount: unstakeAmount,
      });
      setUnstakeAmount("");
    } catch (err) {
      setError("Failed to unstake");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHarvest = async () => {
    if (!connected) return;
    setError(null);
    setLoading(true);

    try {
      await harvest(farm.id);
    } catch (err) {
      setError("Failed to harvest rewards");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>
        {farm.pool.token0.symbol}/{farm.pool.token1.symbol} Farm
      </Title>

      <Stats>
        <Stat>
          <StatLabel>APR</StatLabel>
          <StatValue>{farm.apr.toFixed(2)}%</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Total Staked</StatLabel>
          <StatValue>{farm.totalStaked.toString()}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Your Stake</StatLabel>
          <StatValue>
            {userPosition ? userPosition.stakedAmount.toString() : "0"}
          </StatValue>
        </Stat>
        <Stat>
          <StatLabel>Pending Rewards</StatLabel>
          <StatValue>
            {Number(pendingRewards).toFixed(6)} {farm.rewardToken.symbol}
          </StatValue>
        </Stat>
      </Stats>

      <InputGroup>
        <Input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Amount to stake"
          min="0"
        />
      </InputGroup>

      <ButtonGroup>
        <Button
          onClick={handleStake}
          disabled={!connected || loading || !stakeAmount}
        >
          {loading ? "Staking..." : "Stake"}
        </Button>
        <Button
          onClick={handleHarvest}
          disabled={!connected || loading || pendingRewards <= BigInt(0)}
        >
          {loading ? "Harvesting..." : "Harvest"}
        </Button>
      </ButtonGroup>

      <InputGroup>
        <Input
          type="number"
          value={unstakeAmount}
          onChange={(e) => setUnstakeAmount(e.target.value)}
          placeholder="Amount to unstake"
          min="0"
        />
      </InputGroup>

      <Button
        onClick={handleUnstake}
        disabled={!connected || loading || !unstakeAmount}
        fullWidth
      >
        {loading ? "Unstaking..." : "Unstake"}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Card>
  );
};

export default FarmCard;
