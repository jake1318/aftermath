import styled from "styled-components";
import Header from "./Header";
import ErrorBoundary from "../common/ErrorBoundary";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const Content = styled.main`
  padding: ${(props) => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Content>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Content>
    </LayoutWrapper>
  );
};

export default Layout;
