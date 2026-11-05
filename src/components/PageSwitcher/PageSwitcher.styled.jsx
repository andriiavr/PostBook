import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Pages = styled.div`
  display: flex;
  height: 52px;
  width: 100%;
  padding: 2px;
  gap: 4px;
  border-radius: 26px;
  align-items: center;
  background-color: #c8c8c8;
`;

export const Page = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  min-width: 100px;
  width: 100%;
  padding: 0 20px;
  font-size: 16px;
  border: 2px solid ${({ theme }) => theme.colors.lines};
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.mainBg};
  color: ${({ theme }) => theme.colors.subText};

  &:hover,
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.mainBg};
    background-color: ${({ theme }) => theme.colors.lines};
  }

  &.active {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;
