import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Slider = () => {
    const [loading, setLoading] = useState(true)
    const [listings, setListing] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(10))
        const querySnap = await getDocs(q)

        let listings = []
        querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
        })
        console.log(listings)
        setListing(listings)
        setLoading(false)
        }

        fetchListings()

    }, [])

    if (loading) {
        return <Spinner />
    }

    if (listings.length === 0) {
        return <></>
    }

    return listings && (
        <> 
            <br />
            <p className='exploreHeading'>Recent</p>

            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                <div className='swiperSlideDiv'>
                { listings.map(({ data, id }) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <img src={data.imageUrls[0]} style={{objectFit: 'contain', minHeight: '200px', height: '30vh', width: '100%'}} alt={`${data.artist}-${data.release}-${id}`}/>
                        <p className='swiperSlideText'>{data.artist} - {data.release}</p>
                        <p className='swiperSlideType'>
                            {data.type}
                        </p>
                    </SwiperSlide>
                ))}
                </div>
            </Swiper>
        </>
    )
}

export default Slider