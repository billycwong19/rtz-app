import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import cd from '../assets/png/cd.png'
import tape from '../assets/png/tape.png'
import vinyl from '../assets/png/vinyl.png'
import { StyledImg, StyledCategoryHeader } from './Category.style'


const Category = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)
    
    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //get reference
                const listingsRef = collection(db, 'listings')

                // create query
                const q = query(
                    listingsRef, 
                    where('type', '==', params.categoryName), 
                    orderBy('timestamp', 'desc'), 
                    limit(10)) 

                // execute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)

                let listings = []

                querySnap.forEach(doc => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('could not fetch listings')
            }
        }

        fetchListings()
    }, [params.categoryName])

    const onFetchMoreListings = async () => {
            try {
                //get reference
                const listingsRef = collection(db, 'listings')

                // create query
                const q = query(
                    listingsRef, 
                    where('type', '==', params.categoryName), 
                    orderBy('timestamp', 'desc'), 
                    startAfter(lastFetchedListing),
                    limit(10)) 

                // execute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)

                let listings = []

                querySnap.forEach(doc => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings((prev) => [...prev, ...listings])
                setLoading(false)
            } catch (error) {
                toast.error('could not fetch listings')
            }
    }

    return (
        <div className='category'>
            <StyledCategoryHeader>
                <StyledImg src={ params.categoryName === 'vinyl' ? 
                    vinyl : 
                    params.categoryName === 'cd' ? 
                    cd : 
                    tape } />
                <p className='pageHeader'>
                    { params.categoryName === 'vinyl' ? 
                    'Vinyl for sale' : 
                    params.categoryName === 'cd' ? 
                    `CD's for sale` : 
                    'Tapes for sale' }
                </p>
            </StyledCategoryHeader>
            { loading ? <Spinner /> : listings && listings.length > 0 ? (<>
                <main className='categoryListings'>
                    {listings.map(listing => (
                        <>
                            <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                        </>
                    ))}
                </main>

                <br />
                <br />
                { lastFetchedListing && (
                    <p className='loadMore' onClick={onFetchMoreListings}>load more</p>
                )}
            </>) : <p>No listings</p>}
        </div>
    )
}

export default Category