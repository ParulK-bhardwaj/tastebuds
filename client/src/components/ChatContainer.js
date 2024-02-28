import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";
import { useState } from 'react';

const ChatContainer = ({ user }) => {
    const [ clickedUser, setClickedUser ] = useState(null)
    return (
        <div className="chat-container">
            <ChatHeader user={user}/>

            <div>
                <button className="options" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="options" disabled={!clickedUser}>Chat</button>
            </div>

            <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>

            <ChatDisplay />
        </div>
    )
}

export default ChatContainer;