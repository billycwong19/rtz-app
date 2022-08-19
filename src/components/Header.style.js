import styled from "styled-components";
import { Person } from '@styled-icons/bootstrap/Person'

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

export const ProfileIcon = styled(Person)`
    color: white;
    height: 32px;
`

export const LinksDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`

