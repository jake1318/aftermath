import styled from "styled-components";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 48px;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 20px;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const FeatureCard = styled(Link)`
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
`;

const StatValue = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to Aftermath DEX</Title>
      <Subtitle>
        Trade, earn, and build on the most advanced DEX platform on Sui Network
      </Subtitle>

      <FeaturesGrid>
        <FeatureCard to={ROUTES.SWAP}>
          <FeatureTitle>Swap Tokens</FeatureTitle>
          <FeatureDescription>
            Trade tokens instantly with the best rates and lowest fees
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard to={ROUTES.POOLS}>
          <FeatureTitle>Provide Liquidity</FeatureTitle>
          <FeatureDescription>
            Earn fees by providing liquidity to trading pools
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard to={ROUTES.FARMS}>
          <FeatureTitle>Farm Yields</FeatureTitle>
          <FeatureDescription>
            Stake your LP tokens and earn additional rewards
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>

      <StatsContainer>
        <StatCard>
          <StatValue>$1.2B+</StatValue>
          <StatLabel>Total Value Locked</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>250K+</StatValue>
          <StatLabel>Total Users</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>$500M+</StatValue>
          <StatLabel>24h Trading Volume</StatLabel>
        </StatCard>
      </StatsContainer>
    </HomeContainer>
  );
};

export default Home;
