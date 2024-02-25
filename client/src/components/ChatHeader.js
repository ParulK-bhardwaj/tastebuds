import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ user}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate();
    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        // As once the user is logged out, they shouldn't be able to see the dashboard
        // window.location.reload()
        navigate('/')
    }
    
    return (
        <div className="chat-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"Profile picture" + user.name}></img>
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>↩️</i>
        </div>
    )
}

export default ChatHeader;