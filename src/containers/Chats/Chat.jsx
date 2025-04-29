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
        <>
            <div className='social-container social-main'>
                <div>
                    <h3>Social Manager</h3>
                </div>
                <div className='social-detail'>
                    <div>
                        Casos en cola: 1
                    </div>
                    <div style={{
                        width: '2px',         // Ancho del divisor
                        backgroundColor: 'black', // Color del divisor
                        margin: '0 20px'      // Espaciado alrededor del divisor
                    }} />
                    <div>
                        Casos Gestionados: 5
                    </div>
                    <div style={{
                        width: '2px',         // Ancho del divisor
                        backgroundColor: 'black', // Color del divisor
                        margin: '0 20px'      // Espaciado alrededor del divisor
                    }} />
                </div>
            </div>
            <div className={'container'}>

                <ChatList onSelectChat={handleSelectChat} />
                <ChatWindow selectedChat={selectedChat} />
            </div>
        </>
    )
}
