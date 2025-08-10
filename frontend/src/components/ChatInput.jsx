import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText("");
        }
    };

    return (
        <div className="flex p-3 border-t bg-white">
            <input
                type="text"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
                onClick={handleSend}
                className="ml-2 px-4 py-2 bg-green-700 text-white rounded-lg"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;