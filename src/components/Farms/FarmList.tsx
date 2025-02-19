import styled from "styled-components";
import { useFarms } from "../../hooks/useFarms";
import FarmCard from "./FarmCard";
import Loading from "../common/Loading";
import { useWallet } from "@mysten/dapp-kit";
import { useEffect } from "react";

const FarmsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  padding: ${(props) => props.theme.spacing.lg};
  text-align: center;
`;

const FarmList = () => {
  const { connected, address } = useWallet();
  const { farms, loading, error, fetchUserPositions } = useFarms();

  useEffect(() => {
    if (connected && address) {
      fetchUserPositions(address);
    }
  }, [connected, address]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <FarmsContainer>
      {farms.map((farm) => (
        <FarmCard key={farm.id} farm={farm} />
      ))}
    </FarmsContainer>
  );
};

export default FarmList;
