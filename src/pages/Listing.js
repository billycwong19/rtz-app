import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Listing = () => {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(null)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setListing(docSnap.data())
                console.log(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }
    console.log(listing.imageUrls)

  return (
    <main>
        <br />
        <Swiper slidesPerView={1} spaceBetween={50} pagination={{ clickable: true }}>
            <div className='swiperSlideDiv'>
            {listing.imageUrls.map((url, i) => (
                <SwiperSlide key={i}>
                    <img src={url} alt={`${listing.release + i}`} style={{ objectFit: 'contain', minHeight: '200px', height: '30vh', width: '100%'}}/>
                </SwiperSlide>
            ))}
            </div>
        </Swiper>
        
        
        <div className='shareIconDiv' onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
                setShareLinkCopied(false)
            }, 2000)
        }}>
            <img src={shareIcon} alt='share icon' />
        </div>

        { shareLinkCopied && <p className='linkCopied'>link copied to clipboard</p>}

        <div className='listingDetails'>
         <p className='listingType'>{listing.type}</p>
            { listing.deal && (
                <p className='discountPrice'>${listing.regPrice - listing.discPrice} discount</p>
            )}
            <p className='listingName'>{listing.release} - ${listing.deal ? listing.discPrice : listing.regPrice}</p>

            <ul className='listingDetailsList'>
                <li>
                    <h3>{listing.artist} - {listing.year}</h3>
                </li>
                <li>
                    <p>{listing.comments}</p>
                </li>
            </ul>
            <p className='listingLocation'>shipping from {listing.location}</p>
            { auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingRelease=${listing.release}`} className='babyLink'>
                    contact seller
                </Link>
            )}
        </div>
    </main>
  )
}

export default Listing