import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";

const ChatContainer = () => {
    return (
        <div className="chat-container">
            <ChatHeader />
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