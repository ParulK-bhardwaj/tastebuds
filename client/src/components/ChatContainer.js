import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";

const ChatContainer = ({ user }) => {
    return (
        <div className="chat-container">
            <ChatHeader user={user}/>
            <div>
                <button className="options">Matches</button>
                <button className="options">Chat</button>
            </div>

            <MatchesDisplay/>

            <ChatDisplay />
        </div>


    )
}

export default ChatContainer;