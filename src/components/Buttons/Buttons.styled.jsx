import styled, { keyframes } from "styled-components";

const loginPulse = (accent) => keyframes`
  0%   { border-color: transparent; box-shadow: 0 0 0 0 ${accent}B3; }
  40%  { border-color: ${accent};   box-shadow: 0 0 0 12px ${accent}00; }
  70%, 100% { border-color: transparent; box-shadow: 0 0 0 0 ${accent}00; }
`;

const loginOutline = (a) => keyframes`
  0%, 100% { border-color: ${a}; }
`;

export const StyledButton = styled.button`
  display: flex;
  width: 100%;
  height: 48px;
  min-width: 48px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px solid transparent;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.accent};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.weight.bold};
  color: #fff;
  transition:
    border 250ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.accentShade};
  }

  &.highlight {
    animation: ${({ theme }) => loginPulse(theme.colors.accent)} 1s ease-in-out
      2;
  }

  @media (prefers-reduced-motion: reduce) {
    &.highlight {
      animation: ${({ theme }) => loginOutline(theme.colors.accent)} 3s linear 1;
    }
  }
`;

export const ButtonText = styled.p`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.layout.tablet}) {
    display: inline;
  }
`;
