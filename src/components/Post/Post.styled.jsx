import styled from "styled-components";

export const StyledPost = styled.li`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: none;
  border-bottom: 1px solid ${({theme}) => theme.colors.lines};
`;

export const Author = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  font-size: 14px;
  color: ${({theme}) => theme.colors.subText};
  
  a {
    font-size: 14px;
    color: ${({theme}) => theme.colors.subText};
  }

  h4 {
    font-weight: ${({theme}) => theme.weight.bold};
    color: #000
  }
`

export const Content = styled.div

export const Interactions = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 0;
  gap: 28px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: black;

  svg {
    fill: none;
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 2px;
    font-size: 20px;
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
    svg {
      fill: ${({ theme }) => theme.colors.accent};
    }
  }
`;
