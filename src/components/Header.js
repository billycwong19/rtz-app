import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledHeader, ProfileIcon } from './Header.style'
import logo from '../assets/png/logo.png'
import textLogo from '../assets/png/text_logo_2.png'

const Header = () => {
  const navigate = useNavigate()
  return (
    <>
      <StyledHeader>
        <div>
          <a href='/'>
            <img src={logo} alt='logo' height={'64px'} />
          </a>
          <img src={textLogo} alt='logo' height={'64px'} />
        </div>
          <ProfileIcon onClick={() => navigate('/profile')}/>
      </StyledHeader>
    </>
  )
}

export default Header