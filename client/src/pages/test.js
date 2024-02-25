import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Card from '../components/Card';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [swipedCards, setSwipedCards] = useState([]);
    const [lastDirection, setLastDirection] = useState('');

    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:4000/user', {
                params: { userId }
            });
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    // One time after the user changes we run the get User method
    useEffect(() => {
        getUser();
    }, []);

    const db = [
        {
            name: 'Richard Hendricks',
            url: 'https://assets.bonappetit.com/photos/5f3bffa3b62c45d85d5245df/master/pass/Stop-Cooking-Like-a-Chef-Meherwan-Irani.jpg',
            about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cuisine: 'Italian',
            favoriteDish: 'Spaghetti Carbonara'
        },
        {
            name: 'Monica Hall',
            url: 'https://allaboutthecooks.co.uk/wp-content/uploads/2023/03/cropped-cropped-Nisa_profil24.png',
            about: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            cuisine: 'Mexican',
            favoriteDish: 'Tacos al Pastor'
        },
    ];

    const swiped = (direction, nameSwiped) => {
        console.log(`You swiped ${direction} on ${nameSwiped}.`);
        setSwipedCards([...swipedCards, nameSwiped]);
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    if (!user) {
        return null;
    }

    // Filter out swiped cards
    const filteredDB = db.filter(character => !swipedCards.includes(character.name));

    return (
        <div className="dashboard">
            <ChatContainer user={user} />
            <div className="swipe-container">
                <div className="card-container">
                    {filteredDB.map(character => (
                        <Card
                            key={character.name}
                            name={character.name}
                            about={character.about}
                            cuisine={character.cuisine}
                            favoriteDish={character.favoriteDish}
                            url={character.url}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}
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
