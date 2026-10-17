import styled from "styled-components";

export const StyledPosts = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
`

export const ThatsIt = styled.div`
    padding: 10px 0;
    text-align: center;
    color: ${({theme}) => theme.colors.subText};

    h2 {
        color: #000;
    }
`