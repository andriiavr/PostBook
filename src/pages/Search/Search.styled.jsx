import styled from "styled-components";

export const StyledSearch = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
  align-items: center;
`;

export const SearchBox = styled.input`
  width: 100%;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  background-color: transparent;
  outline: 2px solid ${({ theme }) => theme.colors.lines};

  &:focus {
    outline-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

export const Filter = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 15px;
  background-color: transparent;

  &.active-filter {
    background-color: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.lines};
`;

export const User = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lines};

  a {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.subText};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h4 {
    font-weight: ${({ theme }) => theme.weight.bold};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #000;
  }

  @media screen and (min-width: ${({theme}) => theme.layout.mobile}){
    flex-direction: row;
  }
`;

export const UserData = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 50px;
`

export const Counters = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: center;
`;