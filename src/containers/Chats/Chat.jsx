import React, { useCallback, useState } from 'react'
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';
import "./ChatListModule.css"

export const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null)

    const handleSelectChat = useCallback((chat) => {
        setSelectedChat(chat);
    }, []);

    return (
        <div className={'container'}>
            <ChatList onSelectChat={handleSelectChat} />
            <ChatWindow selectedChat={selectedChat} />
        </div>
    )
}
