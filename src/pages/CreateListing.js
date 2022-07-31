import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase.config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import  { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'


const CreateListing = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'vinyl',
        artist: '',
        release: '',
        year: '',
        images: {},
        deal: false,
        regPrice: `0.00`,
        discPrice: `0.00`,
        location: '',
        ship: `0.00`,
        comments: ''

    })
    const { type, artist, release, year, images, deal, regPrice, discPrice, location, ship, comments } = formData

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]) 

    
    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (discPrice >= regPrice && deal) {
            setLoading(false)
            toast.error('discounted price needs to be less than regular price')
        }
        if (images.length > 6) {
            setLoading(false)
            toast.error('max 6 images')
        }

        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        console.log(error)
                        reject(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            })
        }

        const imageUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error('images could not upload')
        })
        
        const formDataCopy = {
            ...formData, 
            imageUrls,
            timestamp: serverTimestamp
        }
        delete formDataCopy.images
        location && (formDataCopy.location = location)
        !formDataCopy.deal && delete formDataCopy.discPrice

        setLoading(false)
    }

    const onMutate = e => {
        let boolean = null
           
        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }

        // files
        if (e.target.files) {
            setFormData(prev => ({
                ...prev, 
                images: e.target.files
            }))
        }

        if (!e.target.files) {
            setFormData(prev => ({
                ...prev, 
                [e.target.id]: boolean ?? e.target.value
            }))
        }   
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='profile'>
            <header>
                <p className='pageHeader'>
                    Create Sale Listing
                </p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className='formLabel'>Type</label>
                    <div className='formButtons'>
                        <button 
                            type='button' 
                            className={type === 'vinyl' ? 'formButtonActive' :'formButton'} 
                            id='type' 
                            value='vinyl' 
                            onClick={onMutate}
                            >
                            Vinyl
                        </button>
                        <button 
                            type='button' 
                            className={type === 'tape' ? 'formButtonActive' :'formButton'} 
                            id='type' 
                            value='tape' 
                            onClick={onMutate}
                            >
                            Tape
                        </button>
                        <button 
                            type='button' 
                            className={type === 'cd' ? 'formButtonActive' :'formButton'} 
                            id='type' 
                            value='cd' 
                            onClick={onMutate}
                            >
                            CD
                        </button>
                    </div>

                    <label className='formLabel'>Artist</label>
                    <input 
                        className='formInputName'
                        type='text'
                        id='artist'
                        value={artist}
                        onChange={onMutate}
                        maxLength='64'
                        minLength='1'
                        required 
                    />
                    
                    <label className='formLabel'>Release</label>
                    <input 
                        className='formInputName'
                        type='text'
                        id='release'
                        value={release}
                        onChange={onMutate}
                        maxLength='64'
                        minLength='1'
                        required 
                    />
                
                    <label className='formLabel'>Year</label>
                    <input 
                        className='formInputName'
                        type='text'
                        id='year'
                        value={year}
                        onChange={onMutate}
                        maxLength='4'
                        minLength='1'
                        required 
                    />
                     
                    <label className='formLabel'>Comments</label>
                    <textarea 
                        className='formInputAddress'
                        type='text'
                        id='comments'
                        value={comments}
                        onChange={onMutate}
                    />

                <label className='formLabel'>Price</label>
                    <div className='formPriceDiv'>
                        <input 
                            className='formInputSmall'
                            type='number'
                            id='regPrice'
                            value={regPrice}
                            onChange={onMutate}
                            min='1'
                            max='10000'
                        />
                    </div>
                <label className='formLabel'>Shipping</label>
                    <div className='formPriceDiv'>
                        <input 
                            className='formInputSmall'
                            type='number'
                            id='ship'
                            value={ship}
                            onChange={onMutate}
                            min='1'
                            max='10000'
                        />
                    </div>

                <label className='formLabel'>Discounted</label>
                    <div className='formButtons'>
                        <button 
                            type='button' 
                            className={deal ? 'formButtonActive' :'formButton'} 
                            id='deal' 
                            value={true} 
                            onClick={onMutate}
                            >
                            Yes
                        </button>
                        <button 
                            type='button' 
                            className={!deal && deal !== null ? 'formButtonActive' :'formButton'} 
                            id='deal' 
                            value={false}
                            onClick={onMutate}
                            >
                            No
                        </button>
                    </div>
                    
                 { deal && (
                    <>
                    <label className='formLabel'>Discounted Price</label>
                        <input 
                            className='formInputSmall'
                            type='number'
                            id='discPrice'
                            value={discPrice}
                            onChange={onMutate}
                            min='1'
                            max='100000'
                            required={deal}
                        />
                    </>
                 )}
            
                <label className='formLabel'>Zip Code</label>
                <input 
                    className='formInputName'
                    type='text'
                    id='location'
                    value={location}
                    onChange={onMutate}
                    maxLength='5'
                    required 
                />
                 <label className='formLabel'>Images</label>
                    <p className='imagesInfo'>The first image will be the cover (max 6 images, only .jpg, .png, or .jpeg).</p>
                        <input 
                            className='formInputFile'
                            type='file'
                            id='images'
                            onChange={onMutate}
                            max='6'
                            accept='.jpg, .png, .jpeg'
                            multiple
                            required
                        />
                    <button type='submit' className='primaryButton createListingButton'>
                        Create Sale
                    </button>
                </form>
            </main>
        </div>
    )
}

export default CreateListing
