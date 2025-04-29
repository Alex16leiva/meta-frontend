import React, { useCallback, useState } from 'react'
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';
import "./ChatListModule.css"
import { FaWhatsapp } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';

export const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null)

    const handleSelectChat = useCallback((chat) => {
        setSelectedChat(chat);
    }, []);

    return (
        <>
            <div className='social-container social-main'>
                <div>
                    <h3 style={{ marginLeft: '8px' }}>Social Manager</h3>
                </div>
                <div className="social-detail">
                    <div className="social-item">
                        <FaWhatsapp style={{ color: '#00A884', marginRight: '8px' }} size={20} />
                        <span style={{ color: '#636e72' }}>Casos en cola:</span>
                        <span style={{ color: 'black', marginLeft: '4px' }}>1</span>
                    </div>
                        <div className="divider" />
                    <div className="social-item">
                        <span style={{ color: '#636e72' }}>Casos Gestionados:</span>
                        <span style={{ color: 'black', marginLeft: '4px' }}>5</span>
                    </div>
                        <div className="divider" />
                    <div className="social-item">
                        <FaUser style={{ color: 'black', marginRight: '8px' }} size={16} />
                        <span style={{ color: 'black', marginLeft: '4px', marginRight: '4px' }}>Juan Perez / Disponible</span>
                        <BsCircleFill style={{ color: '#25D366', marginRight: '8px' }} size={13} />
                    </div>
                </div>
            </div>
            <div className={'container'}>

                <ChatList onSelectChat={handleSelectChat} />
                <ChatWindow selectedChat={selectedChat} />
            </div>
        </>
    )
}
