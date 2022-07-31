import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'


const Deals = () => {
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
                    where('deal', '==', true), 
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
    }, [])

    const onFetchMoreListings = async () => {
        try {
            //get reference
            const listingsRef = collection(db, 'listings')

            // create query
            const q = query(
                listingsRef, 
                where('deal', '==', true), 
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
            <header>
                <p className='pageHeader'>
                    Deals
                </p>
            </header>
            { loading ? <Spinner /> : listings && listings.length > 0 ? (<>
                <main className='categoryListings'>
                    {listings.map(listing => (
                        <>
                            <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                        </>
                    ))}

                    <br />
                    <br />
                { lastFetchedListing && (
                    <p className='loadMore' onClick={onFetchMoreListings}>load more</p>
                )}
                </main>
            </>) : <p>No listings</p>}
        </div>
    )
}

export default Deals