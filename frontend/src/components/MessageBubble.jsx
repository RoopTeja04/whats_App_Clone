import React from "react";
import { MdDone, MdDoneAll } from "react-icons/md";

const MessageBubble = ({ msg, prevMsg }) => {
    const isSent = msg.isSent;

    const showDateSeparator =
        !prevMsg ||
        new Date(prevMsg.timestamp).toDateString() !==
        new Date(msg.timestamp).toDateString();

    const getStatusIcon = (status) => {
        switch (status) {
            case "sent":
                return <MdDone size={16} />;
            case "delivered":
                return <MdDoneAll size={16} />;
            case "read":
                return <MdDoneAll size={16} color="#4FC3F7" />; 
            default:
                return null;
        }
    };

    return (
        <>
            {showDateSeparator && (
                <div className="flex justify-center my-3">
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-md text-xs">
                        {new Date(msg.timestamp).toLocaleDateString()}
                    </span>
                </div>
            )}

            <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2`}>
                <div
                    className={`px-4 py-2 rounded-lg max-w-xs flex flex-col ${isSent ? "bg-green-800 text-white" : "bg-white text-black"
                        } shadow`}
                >
                    <span>{msg.message}</span>
                    <div className="flex items-center justify-end text-xs mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        {isSent && <span className="ml-1">{getStatusIcon(msg.status)}</span>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageBubble;