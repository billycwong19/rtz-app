import { getAuth, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Profile = () => {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  
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
        </main>
      </div>
    )
  }
  
  export default Profile