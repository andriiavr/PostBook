import styled from "styled-components";

export const StyledProfile = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
  align-items: center;
`;

export const ProfileInfo = styled.div`
  width: 100%;
  padding: 20px;
  padding-top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lines};
`;

export const Counters = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 20px 0;
  text-align: center;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 20px;

  &.following {
    grid-template-columns: 1fr 1fr;
  }
`;
