import { getAuth, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import { MdQueueMusic } from 'react-icons/md'
import ListingItem from '../components/ListingItem'

const Profile = () => {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  useEffect(() => {
      const fetchUserListings = async () => {
          const listingsRef = collection(db, 'listings')
          const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))  

          const querySnap = await getDocs(q)
          const listings = []

          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data()
            })
          })

          setListings(listings)
          setLoading(false)
      }

      fetchUserListings()
  }, [auth.currentUser.uid])

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }

      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })

    } catch (error) {
      toast.error('could not be updated at this moment')
    }
  }
  const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const onDelete = async (listingId) => {
      if (window.confirm('are you sure you want to delete this sale?')){
        await deleteDoc(doc(db, 'listings', listingId))
        const updatedListings = listings.filter((listing) => listing.id !== listingId)
        setListings(updatedListings)
        toast.success('successfully deleted!')
      }
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>
          My Profile
        </p>
        <button type='button' className='logOut' onClick={onLogout}>
          logout
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal</p>
          <p className='changePersonalDetails' onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails(prev => !prev)
          }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className='profileCard'>
          <input type='text' id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} />
          <input type='text' id='email' className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email} onChange={onChange} />
        </div>

        <Link to='/create-listing' className='createListing'>
          <MdQueueMusic />
          <p>Create Sale</p>
          <img src={arrowRight} alt='arrow' />
        </Link>

        { !loading && listings?.length > 0 && (
          <>
              <p className='listingText'>your listings</p>
              <ul className='listingsList'>
                {listings.map((listing) => (
                    <ListingItem key={listing.id} listing={listing.data} id={listing} onDelete={() => onDelete(listing.id)} />
                ))}
              </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile