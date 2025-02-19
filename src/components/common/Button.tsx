import styled from "styled-components";

interface ButtonProps {
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

export default Button;
