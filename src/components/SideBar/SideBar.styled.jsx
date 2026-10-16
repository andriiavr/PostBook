import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  align-self: start;
  max-width: 280px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  gap: 24px;
  overflow-y: auto;

  @media screen and (max-width: ${({ theme }) => theme.layout.mobile}) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    max-width: none;
    height: auto;
    align-items: center;
    gap: 0;
    background-color: #fff;
    overflow: visible;
    padding: 40px 0 0;
  }
`;

export const Logo = styled.div`
  display: none;

  @media screen and (min-width: ${({ theme }) => theme.layout.mobile}) {
    display: block;
  }
`;

export const Pages = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;

  @media screen and (min-width: ${({ theme }) => theme.layout.mobile}) {
    flex-direction: column;
    justify-content: none;
  }
`;

export const Page = styled(NavLink)`
  display: block;
  padding: 10px;
  border-radius: 10px;

  &:hover,
  &:focus {
    background-color: #d1d1d1;
  }

  &.active {
    background-color: #cacaca;
  }
`;

export const PageName = styled.p`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.layout.tablet}) {
    display: inline;
  }
`;

export const ButtonWrapper = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.layout.mobile}) {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    margin: 0 0 16px;
    border-radius: 50px;
    background-color: #fff;
  }
`;
