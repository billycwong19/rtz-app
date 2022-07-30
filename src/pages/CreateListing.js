import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


const CreateListing = () => {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [formData, setFormData] = useState({
        type: '',
        artist: '',
        release: '',
        year: '',
        imageUrls: [],
        deal: false,
        regPrice: 0,
        discPrice: 0,
        location: '',
        ship: 5,
        latitude: 0,
        longitude: 0,

    })

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid })
                } else {
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted]) 

    return (
        <div>CreateListing</div>
    )
}

export default CreateListing
