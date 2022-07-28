import { Link } from "react-router-dom"
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import { FaCompactDisc } from 'react-icons/fa'
import { RiTapeLine } from 'react-icons/ri'
import { TbVinyl } from 'react-icons/tb'



const Explore = () => {
  return (
    <div className="explore">
        <header>
         <p className="pageHeader">Explore</p>

        </header>

        <main>
          {/* slider goes here */}
          <p className="exploreCategoryHeading">
            Categories
          </p>
          <div className="exploreCategories">
            <Link to='/category/vinyl' >
              <TbVinyl className="exploreCategoryImg" />
              <p className="exploreCategoryName">Vinyl</p>
            </Link>
            <Link to='/category/tape' >
              <RiTapeLine className="exploreCategoryImg" />
              <p className="exploreCategoryName">Tape</p>
            </Link>
            <Link to='/category/cd' >
              <FaCompactDisc className="exploreCategoryImg" />
              <p className="exploreCategoryName">CD</p>
            </Link>
          </div>
        </main>
    </div>
  )
}

export default Explore