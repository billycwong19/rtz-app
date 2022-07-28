import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


const Category = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    
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

    return (
        <div className='category'>
            <header>
                <p className='pageHeader'>
                    { params.categoryName === 'vinyl' ? 
                    'Vinyl for sale' : 
                    params.categoryName === 'cd' ? 
                    `CD's for sale` : 
                    'Tapes for sale' }
                </p>
            </header>
            { loading ? <Spinner /> : listings && listings.length > 0 ? (<>
                <main className='categoryListings'>
                    {listings.map(listing => (
                        <h3>{listing.data.release}</h3>
                    ))}
                </main>
            </>) : <p>No listings</p>}
        </div>
    )
}

export default Category