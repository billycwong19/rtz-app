import { Link } from "react-router-dom"
import vinyl from '../assets/png/vinyl.png'
import tape from '../assets/png/tape.png'
import cd from '../assets/png/cd.png'
import Slider from "../components/Slider"


const Explore = () => {
  return (
    <div className="explore">
        <main>
          <Slider />
          <Link to='/deals' style={{ color: '#000', marginRight: '2em'}}>
            <h2 style={{ color: '#F4006F', textDecoration: 'underline'}}>Today's Deals!</h2>
          </Link>
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