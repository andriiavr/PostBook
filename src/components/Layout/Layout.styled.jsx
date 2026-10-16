import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-height: 100vh;
  gap: 0;
  max-width: ${({ theme }) => theme.layout.desktop};
  margin: 0 auto;
  justify-content: center;

  @media screen and (min-width: ${({ theme }) => theme.layout.mobile}) {
    grid-template-columns: 58px minmax(0, 100%);
  }

  @media screen and (min-width: ${({ theme }) => theme.layout.tablet}) {
    grid-template-columns: minmax(0px, 280px) minmax(400px, 600px) minmax(
        0,
        280px
      );
    gap: 32px;
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  justify-content: start;
  align-items: center;

  border-right: 1px solid ${({ theme }) => theme.colors.lines};
  border-left: 1px solid ${({ theme }) => theme.colors.lines};
  background-color: ${({ theme }) => theme.colors.contentBg};

  @media screen and (min-width: ${({theme}) => theme.layout.tablet}){
    max-width: 600px;
  }
`;

export const RightSidebar = styled.aside`
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  overflow-y: auto;

  @media screen and (max-width: ${({ theme }) => theme.layout.tablet}) {
    display: none;
  }
`;
