import React from 'react'
import { Link } from 'react-router-dom'
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
          <img src={textLogo} alt='logo' height={'64px'} />
          <h3>market</h3>
        </div>
        <div>
          <Link to='/deals'>Deals</Link>
          <Link to='/profile'><PersonOutlineIcon style={{ color: '#fff' }} /></Link>
        </div>
      </StyledHeader>

    </>
  )
}

export default Header