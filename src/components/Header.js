import React from 'react'
import { Link } from 'react-router-dom'
import { StyledHeader, ProfileIcon, LinksDiv } from './Header.style'
import logo from '../assets/png/logo.png'
import textLogo from '../assets/png/text_logo_2.png'

const Header = () => {

  return (
    <>
      <StyledHeader>
        <div>
          <a href='/'>
            <img src={logo} alt='logo' height={'64px'} />
          </a>
          <img src={textLogo} alt='logo' height={'64px'} />
          <h3>market</h3>
        </div>
        <LinksDiv>
          <Link to='/deals' style={{ color: '#fff', marginRight: '2em'}}>Deals</Link>
          <Link to='/profile'><ProfileIcon /></Link>
        </LinksDiv>
      </StyledHeader>

    </>
  )
}

export default Header