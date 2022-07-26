import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const onChange = (e) => {
        setFormData((prev) => ({
          ...prev, 
          [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
      e.preventDefault()

      try {
        const auth = getAuth()

        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        if (userCredential.user) {
          navigate('/')
        }
      } catch (error) {
        toast.error('email/password incorrect')
      }

    }
    return (
      <>
        <div className='pageContainer'>
            <header>
              <p className='pageHeader'>
                Welcome Back!
              </p>
            </header>

            <main>
              <form onSubmit={onSubmit}>
                <input type='email' className='emailInput' placeholder='email' id='email' value={email} onChange={onChange} />
                <div className='passwordInputDiv'>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className='passwordInput' 
                    placeholder='password' 
                    id='password' 
                    value={password} 
                    onChange={onChange} />
                  <img 
                  className='showPassword' 
                  src={visibilityIcon} 
                  alt='show password' 
                  onClick={() => setShowPassword(prev => !prev)} 
                  />
                </div>

                <Link to='/forgot-password' className='forgotPasswordLink'>forgot password?</Link>

                <div className='signInBar'>
                  <p className='signInText'>Sign in</p>
                  <button className='signInButton'>
                    <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                  </button>
                </div>
              </form>
              {/* google oautho component */}

              <Link to='/sign-up' className='registerLink'>Sign up instead</Link>
            </main>
        </div>
      </>
    )
  }
  
  export default SignIn