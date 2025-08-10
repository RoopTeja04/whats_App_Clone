import React from "react";

const Sidebar = ({ chats, onSelectChat, selectedChat, isMobileView }) => {
    return (
        <div className={`${isMobileView ? "w-full" : "w-1/3"} bg-gray-100 border-r overflow-y-auto`}>

            {/* Mobile Header */}
            {isMobileView && (
                <div className="p-3 bg-green-500 text-white font-bold text-lg">
                    Chats
                </div>
            )}

            {chats.map((chat, index) => {
                const isActive = selectedChat === chat.wa_id;
                return (
                    <div
                        key={index}
                        onClick={() => onSelectChat(chat.wa_id)}
                        className={`p-4 flex items-center cursor-pointer transition-colors duration-150 ${isActive ? "bg-green-200" : "hover:bg-gray-200"
                            }`}
                    >
                        {/* Avatar */}
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold ${isActive ? "bg-green-600" : "bg-green-500"
                                }`}
                        >
                            {chat.name?.[0] || "?"}
                        </div>

                        {/* Chat Info */}
                        <div className="ml-3 flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <span
                                    className={`font-semibold truncate ${isActive ? "text-green-900" : ""
                                        }`}
                                >
                                    {chat.name}
                                </span>
                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                    {chat.lastMessageTime &&
                                        new Date(chat.lastMessageTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                                {chat.lastMessage}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;