import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'



const Navbar = () => {
    const navigate =  useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }

  return (
    <footer className='navbar'>
        <nav className='navbarNav'>
            <ul className='navbarListItems'>
                <li 
                className='navbarListItem' 
                onClick={() => navigate('/')}
                >
                    <ExploreIcon 
                    fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' 
                    height='36px'
                    />
                    <p 
                    className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                </li>
                <li 
                className='navbarListItem' 
                onClick={() => navigate('/category/vinyl')}
                >
                    <ExploreIcon 
                    fill={pathMatchRoute('/category/vinyl') ? '#2c2c2c' : '#8f8f8f'} width='36px' 
                    height='36px'
                    />
                    <p 
                    className={pathMatchRoute('/category/vinyl') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Vinyl</p>
                </li>
                <li 
                className='navbarListItem' 
                onClick={() => navigate('/category/tape')}
                >
                    <OfferIcon 
                    fill={pathMatchRoute('/category/tape') ? '#2c2c2c' : '#8f8f8f'} width='36px' 
                    height='36px' 
                    />
                    <p 
                    className={pathMatchRoute('/category/tape') ? 'navbarListItemNameActive' : 'navbarListItemName'}
                    >Tape</p>
                </li>
                <li 
                className='navbarListItem' 
                onClick={() => navigate('/category/cd')}
                >
                    <OfferIcon 
                    fill={pathMatchRoute('/category/cd') ? '#2c2c2c' : '#8f8f8f'} width='36px' 
                    height='36px' 
                    />
                    <p 
                    className={pathMatchRoute('/category/cd') ? 'navbarListItemNameActive' : 'navbarListItemName'}
                    >CD</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar