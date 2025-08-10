import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { getConversations, getMessagesByWaId, sendMessage } from "../services/api";

const Home = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch conversations
    useEffect(() => {
        getConversations().then((res) => {
            if (res.data.success) setChats(res.data.conversations);
        });
    }, []);

    // Fetch messages when chat selected
    useEffect(() => {
        if (selectedChat) {
            getMessagesByWaId(selectedChat).then((res) => {
                if (res.data.success) {
                    const formatted = res.data.messages.map((msg) => ({
                        message: msg.message,
                        timestamp: msg.timestamp,
                        isSent: msg.wa_id !== selectedChat,
                        status: msg.status
                    }));
                    setMessages(formatted);
                }
            });
        }
    }, [selectedChat]);

    // Send message
    const handleSendMessage = (text) => {
        if (!selectedChat) return;
        sendMessage({
            wa_id: selectedChat,
            name: chats.find((c) => c.wa_id === selectedChat)?.name || "Unknown",
            message: text
        }).then((res) => {
            if (res.data.success) {
                setMessages((prev) => [
                    ...prev,
                    { message: text, timestamp: new Date(), isSent: true, status: "sent" }
                ]);
                getConversations().then((res) => {
                    if (res.data.success) setChats(res.data.conversations);
                });
            }
        });
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {(!isMobileView || (isMobileView && !selectedChat)) && (
                <Sidebar
                    chats={chats}
                    onSelectChat={setSelectedChat}
                    selectedChat={selectedChat}
                    isMobileView={isMobileView}
                />
            )}

            {/* Chat Window */}
            {(!isMobileView || (isMobileView && selectedChat)) && (
                <ChatWindow
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isMobileView={isMobileView}
                    onBack={() => setSelectedChat(null)}
                />
            )}
        </div>
    );
};

export default Home;