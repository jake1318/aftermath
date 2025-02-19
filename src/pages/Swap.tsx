import styled from "styled-components";
import SwapCard from "../components/Swap/SwapCard";
import PriceChart from "../components/Swap/PriceChart";

const SwapPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Swap = () => {
  return (
    <SwapPage>
      <SwapCard />
      <PriceChart tokenPair="SUI/USDC" />
    </SwapPage>
  );
};

export default Swap;
