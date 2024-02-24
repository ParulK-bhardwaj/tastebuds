import { useState } from 'react';

const ChatInput = () => {
    const [text, setText] = useState(null)
    return (
        <div className="chat-input">
            <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button className='secondary-button'>Submit</button>
        </div>
    )
}

export default ChatInput;