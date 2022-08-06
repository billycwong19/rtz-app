import { Link } from "react-router-dom"
import vinyl from '../assets/png/vinyl.png'
import tape from '../assets/png/tape.png'
import cd from '../assets/png/cd.png'
import logo from '../assets/png/logo.png'
import textLogo from '../assets/png/text_logo_2.png'

import Slider from "../components/Slider"
import { StyledHeader } from "./Explore.styles"


const Explore = () => {
  return (
    <div className="explore">
        <StyledHeader>
          <img src={logo} alt='logo' height={'64px'}/>
          <img src={textLogo} alt='logo' height={'64px'}/>
          <p className="pageHeader">marketplace</p>
        </StyledHeader>

        <hr />
        <main>
          <Slider />
          <p className="exploreCategoryHeading">
            Categories
          </p>
          <div className="exploreCategories">
            <Link to='/category/vinyl' >
              <img src={vinyl} className="exploreCategoryImg" alt='vinyl' />
              <p className="exploreCategoryName">Vinyl</p>
            </Link>
            <Link to='/category/tape' >
            <img src={tape} className="exploreCategoryImg" alt='tape' />
              <p className="exploreCategoryName">Tape</p>
            </Link>
            <Link to='/category/cd' >
            <img src={cd} className="exploreCategoryImg" alt='cd' />
              <p className="exploreCategoryName">CD</p>
            </Link>
          </div>
        </main>
    </div>
  )
}

export default Explore