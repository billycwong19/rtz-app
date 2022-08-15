import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: rgb(0, 0, 0, 0.7);
    padding: .5rem .5rem;

    div {
        display: flex;
        align-items: center;

        a {
            color: white;
            padding: 0;
            margin: 0;
        }
    }
    
    img {
        margin: 0 1em 0 .5em;
    }

    h3 {
        margin: 0;
        padding: 0;
        color: #fff;
    }
`

