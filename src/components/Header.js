import React from 'react'
import { StyledHeader } from './Header.style'
import logo from '../assets/png/logo.png'
import textLogo from '../assets/png/text_logo_2.png'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

const Header = () => {
  return (
    <>
        <StyledHeader>
          <div>
            <a href='/'>
            <img src={logo} alt='logo' height={'64px'} />
            </a>
            <img src={textLogo} alt='logo' height={'64px'}/>
            <h3>market</h3>
          </div>
          <div>
            <a href='/deals'>Deals</a>
            
            <a href='/profile'><PersonOutlineIcon style={{ color: '#fff' }}/></a>
          </div> 
        </StyledHeader>
        
    </>
  )
}

export default Header