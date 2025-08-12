import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { getConversations, getMessagesByWaId, sendMessage } from "../services/api";
import socket from "../socket"; 

const Home = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        getConversations().then((res) => {
            if (res.data.success) setChats(res.data.conversations);
        });
    }, []);

    useEffect(() => {
        if (selectedChat) {

            socket.emit("joinRoom", selectedChat);

            getMessagesByWaId(selectedChat).then((res) => {
                if (res.data.success) {
                    const formatted = res.data.messages.map((msg) => ({
                        ...msg,
                        isSent: msg.wa_id !== selectedChat
                    }));
                    setMessages(formatted);
                }
            });
        }
    }, [selectedChat]);

    useEffect(() => {
        socket.on("newMessage", (msg) => {
            setMessages((prev) => [...prev, {
                ...msg,
                isSent: msg.wa_id !== selectedChat
            }]);
        });

        socket.on("statusUpdate", (update) => {
            setMessages((prev) =>
                prev.map((m) =>
                    m._id === update.id ? { ...m, status: update.status } : m
                )
            );
        });

        return () => {
            socket.off("newMessage");
            socket.off("statusUpdate");
        };
    }, [selectedChat]);

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
                    { ...res.data.data, isSent: true }
                ]);
                getConversations().then((res) => {
                    if (res.data.success) setChats(res.data.conversations);
                });
            }
        });
    };

    return (
        <div className="flex h-screen">
            {(!isMobileView || (isMobileView && !selectedChat)) && (
                <Sidebar
                    chats={chats}
                    onSelectChat={setSelectedChat}
                    selectedChat={selectedChat}
                    isMobileView={isMobileView}
                />
            )}
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
