import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useWallet, ConnectButton } from "@mysten/dapp-kit";
import { ROUTES } from "../../utils/constants";

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary}33;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

const Header = () => {
  const location = useLocation();
  const { address } = useWallet();

  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo to={ROUTES.HOME}>Aftermath DEX</Logo>
        <Nav>
          <NavLink to={ROUTES.SWAP} $active={location.pathname === ROUTES.SWAP}>
            Swap
          </NavLink>
          <NavLink
            to={ROUTES.POOLS}
            $active={location.pathname === ROUTES.POOLS}
          >
            Pools
          </NavLink>
          <NavLink
            to={ROUTES.FARMS}
            $active={location.pathname === ROUTES.FARMS}
          >
            Farms
          </NavLink>
          <WalletInfo>
            {address && (
              <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
            )}
            <ConnectButton />
          </WalletInfo>
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
