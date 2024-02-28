import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Card from '../components/Card';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [swipedCards, setSwipedCards] = useState([]);
    const [lastDirection, setLastDirection] = useState();
    const [preferredCuisineUsers, setPreferredCuisineUsers] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:4000/user', {
                params: { userId }
            })
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getPreferredCuisineUsers = async() => {
        try {
            const response = await axios.get('http://localhost:4000/cuisine-users', {
                params: {cuisine: user.preferred_cuisine}
            })
            setPreferredCuisineUsers(response.data)     
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getPreferredCuisineUsers()
        }
    }, [user])
    
    const updateMatches = async(matchedUserId) => {
        try {
            const response = await axios.put('http://localhost:4000/addmatch', {
                userId,
                matchedUserId
            }) 
            getUser()
        } catch (error) {
            console.log(error)
        }
    }
   
    const swiped = (direction, swipedUserId) => {
        console.log(`You swiped ${direction} on ${swipedUserId}.`);
        setSwipedCards([...swipedCards, swipedUserId]);
           
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    console.log('user>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', user)
    const matchedIdsIncludingCurrentUser = user?.matches.map(({user_id}) => user_id).concat(userId)

    console.log('matchedIdsIncludingCurrentUser _________=========',matchedIdsIncludingCurrentUser)
    // const filteredUsers = preferredCuisineUsers?.filter(preferredUser => !matchedUserIds.includes(preferredUser.user_id));

    // Filter out swiped cards
    // const filteredUsers = preferredCuisineUsers ? preferredCuisineUsers.filter(character => !swipedCards.includes(character.user_id)) : [];
    // const filteredUsers = preferredCuisineUsers
    // ? preferredCuisineUsers.filter(preferredUser => {
    //     return !swipedCards.includes(preferredUser.user_id) && preferredUser.user_id !== userId;
    // })
    // : [];

    const filteredUsers = preferredCuisineUsers
    ? preferredCuisineUsers.filter(preferredUser => {
        // Check if the user is not swiped and not the current user
        return (
            !swipedCards.includes(preferredUser.user_id) &&
            preferredUser.user_id !== userId &&
            // Check if the user is not already matched
            !matchedIdsIncludingCurrentUser.includes(preferredUser.user_id)
        );
    })
    : [];

    console.log('filteredusers-------', filteredUsers)
    if (!user) {
        return null;
    }
    return (
        <div className="dashboard">
            <ChatContainer user={user} />
            <div className="swipe-container">
                <div className="card-container">
                    {filteredUsers.map(preferredUser => (
                        <Card
                            key={preferredUser.first_name + preferredUser.last_name}
                            name={preferredUser.first_name + ' ' + preferredUser.last_name}
                            about={preferredUser.about}
                            cuisine={preferredUser.specialized_cuisine}
                            favoriteDish={preferredUser.favorite_dish}
                            url={preferredUser.url}
                            onSwipe={(dir) => swiped(dir, preferredUser.user_id)}
                            onCardLeftScreen={() => outOfFrame(preferredUser.first_name + ' ' + preferredUser.last_name)}
                        />
                    ))}
                    <div className="swipe-info">
                        {lastDirection ? <p>You Swiped {lastDirection}</p> : <p/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
