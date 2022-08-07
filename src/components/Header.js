import React from 'react'
import { StyledHeader } from './Header.style'
import logo from '../assets/png/logo.png'
import textLogo from '../assets/png/text_logo_2.png'

const Header = () => {
  return (
    <>
        <StyledHeader>
            <img src={logo} alt='logo' height={'64px'}/>
            <img src={textLogo} alt='logo' height={'64px'}/>
            <p className="pageHeader">marketplace</p>
        </StyledHeader>
    </>
  )
}

export default Header