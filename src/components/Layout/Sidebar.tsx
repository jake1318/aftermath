import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const SidebarWrapper = styled.aside`
  background-color: ${(props) => props.theme.colors.surface};
  width: 240px;
  padding: ${(props) => props.theme.spacing.lg};
  border-right: 1px solid ${(props) => props.theme.colors.primary}33;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.2s;
  background-color: ${(props) =>
    props.$active ? `${props.theme.colors.primary}11` : "transparent"};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}11;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.primary}33;
  margin: ${(props) => props.theme.spacing.lg} 0;
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarWrapper>
      <Logo>Aftermath DEX</Logo>
      <Divider />
      <NavList>
        <NavItem to={ROUTES.SWAP} $active={location.pathname === ROUTES.SWAP}>
          Swap Tokens
        </NavItem>
        <NavItem to={ROUTES.POOLS} $active={location.pathname === ROUTES.POOLS}>
          Liquidity Pools
        </NavItem>
        <NavItem to={ROUTES.FARMS} $active={location.pathname === ROUTES.FARMS}>
          Yield Farms
        </NavItem>
      </NavList>
    </SidebarWrapper>
  );
};

export default Sidebar;
