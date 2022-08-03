import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Contact = () => {
    const [message, setMessage] = useState('')
    const [seller, setSeller] = useState(null)
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams()
    
    const params = useParams()

    useEffect(() => {
        const getSeller = async () => {
            const docRef = doc(db, 'users', params.sellerId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setSeller(docSnap.data())
            } else {
                toast.error('could not find seller info')
            }
        }

        getSeller()

    }, [params.sellerId])

    const onChange = e => setMessage(e.target.value)

    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>
                    Contact Seller
                </p>
            </header>

            {seller !== null && (
                <main>
                    <div className='contactLandlord'>
                        <p className='landlordName'>
                            Contact {seller?.name}
                        </p>
                    </div>
                    <form className='messageForm'>
                        <div className='messageDiv'>
                            <label className='messageLabel' htmlFor='message'>message</label>
                            <textarea name='message' id='message' className='textarea' value={message} onChange={onChange}></textarea>
                        </div>
                        <a href={`mailto:${seller.email}?Subject=${searchParams.get('listingRelease')}&body=${message}`}>
                            <button className='primaryButton' type='button'>send message</button>
                        </a>
                    </form>
                </main>
            )}
        </div>
    )
}

export default Contact