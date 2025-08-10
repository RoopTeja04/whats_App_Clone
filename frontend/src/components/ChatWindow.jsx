import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatWindow = ({ messages, onSendMessage, isMobileView, onBack }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col w-full md:w-2/3">
            {/* Header with Back Button on Mobile */}
            {isMobileView && (
                <div className="p-3 bg-green-500 text-white flex items-center">
                    <button onClick={onBack} className="mr-2 font-bold">&larr;</button>
                    <span>Chat</span>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        msg={msg}
                        prevMsg={index > 0 ? messages[index - 1] : null}
                    />
                ))}
                <div ref={bottomRef} />
            </div>
            <ChatInput onSend={onSendMessage} />
        </div>
    );
};

export default ChatWindow;