import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Card from '../components/Card';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [swipedCards, setSwipedCards] = useState([]);
    const [lastDirection, setLastDirection] = useState('');
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
        getUser();
        getPreferredCuisineUsers();
    }, [user, preferredCuisineUsers]);

    console.log(preferredCuisineUsers)
    // const db = [
    //     {
    //         name: 'Richard Hendricks',
    //         url: 'https://assets.bonappetit.com/photos/5f3bffa3b62c45d85d5245df/master/pass/Stop-Cooking-Like-a-Chef-Meherwan-Irani.jpg',
    //         about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //     },
    //     {
    //         name: 'Monica Hall',
    //         url: 'https://allaboutthecooks.co.uk/wp-content/uploads/2023/03/cropped-cropped-Nisa_profil24.png',
    //         about: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //     },
    // ];

    const swiped = (direction, nameSwiped) => {
        console.log(`You swiped ${direction} on ${nameSwiped}.`);
        setSwipedCards([...swipedCards, nameSwiped]);
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

   

    // Filter out swiped cards
    const filteredDB = preferredCuisineUsers ? preferredCuisineUsers.filter(character => !swipedCards.includes(character.first_name + ' ' + character.last_name)) : [];

    if (!user) {
        return null;
    }
    return (
        <div className="dashboard">
            <ChatContainer user={user} />
            <div className="swipe-container">
                <div className="card-container">
                    {filteredDB.map(character => (
                        <Card
                            key={character.first_name + character.last_name}
                            name={character.first_name + ' ' + character.last_name}
                            about={character.about}
                            cuisine={character.cuisine}
                            favoriteDish={character.favoriteDish}
                            url={character.url}
                            onSwipe={(dir) => swiped(dir, character.first_name + ' ' + character.last_name)}
                            onCardLeftScreen={() => outOfFrame(character.first_name + ' ' + character.last_name)}
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
