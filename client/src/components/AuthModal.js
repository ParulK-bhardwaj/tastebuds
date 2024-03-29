import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModal = ( { setShowModal, isSignUp }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if(isSignUp && (password !== confirmPassword)) {
                setError('Passwords do not Match!')
                return 
            } 
            const response = await axios.post(`http://localhost:4000/${isSignUp? 'signup': 'login'}`, { email, password })

            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)
            
            const success = response.status === 201

            if (success && isSignUp) navigate('/onboarding')
            if (success && !isSignUp) navigate('/dashboard')

            window.location.reload()

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="auth-modal">
            <div onClick={handleClick}>ⓧ</div>
            <h2>{ isSignUp? 'Create Account' : 'Log In'}</h2>
            <p>By clicking, you are agreeing to our term. Learn more.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    id='email'
                    placeholder='email'
                    required={true}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <input
                    type='password'
                    id='password'
                    placeholder='password'
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type='password'
                    id='confirm-password'
                    placeholder='confirm password'
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className='secondary-button'
                    type='submit'
                />
                <p>{error}</p>
            </form>
        </div>
    )
}

export default AuthModal;