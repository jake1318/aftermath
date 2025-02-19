import styled from "styled-components";
import { usePools } from "../../hooks/usePools";
import PoolCard from "./PoolCard";
import Loading from "../common/Loading";

const PoolsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  padding: ${(props) => props.theme.spacing.lg};
  text-align: center;
`;

const PoolList = () => {
  const { pools, loading, error } = usePools();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <PoolsContainer>
      {pools.map((pool) => (
        <PoolCard key={pool.id} pool={pool} />
      ))}
    </PoolsContainer>
  );
};

export default PoolList;
