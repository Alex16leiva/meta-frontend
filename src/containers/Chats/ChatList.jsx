import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import PropTypes from "prop-types";
import "./ChatListModule.css"
import ChatCard from "./ChatCard";
import { ChatType, ChatTypeSelected, Badge } from "./ChatListStyle";

export const ChatList = ({ onSelectChat }) => {
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedDiv, setSelectedDiv] = useState(null);
    useEffect(() => {
        const obtenerChat = async () => {
            try {
                const response = await fetch("https://localhost:7013/api/whatsapp/obtener-mensajes");
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                const data = await response.json();
                setChats(data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        obtenerChat();
    }, []);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        onSelectChat(chat);
    };

    const toggleSelect = (divNumber) => {
        setSelectedDiv(selectedDiv === divNumber ? null : divNumber);
    }

    return (
        <div className="chatList">
            <div className="searchContainer">
                Inversiones 98886969
            </div>
            <ChatType>
                <ChatTypeSelected
                    className={selectedDiv === 1 ? 'selected' : ''}
                    onClick={() => toggleSelect(1)}>
                    <span>Activos</span>
                    <Badge>3</Badge>
                </ChatTypeSelected>
                <ChatTypeSelected
                    className={selectedDiv === 2 ? 'selected' : ''}
                    onClick={() => toggleSelect(2)}>
                    En Pausa
                </ChatTypeSelected>
            </ChatType>
            <div className="chats">
                <div className="searchContainer">
                    <Search className="searchIcon" />
                    <input type="text" placeholder="Buscar o empezar un chat nuevo" className="searchInput" />
                </div>
                {chats.map((chat) => (
                    <ChatCard key={chat.numeroTelefono}
                        chat={chat}
                        onSelectChat={handleSelectChat}
                        isSelected={selectedChat?.numeroTelefono === chat.numeroTelefono}
                    />
                ))}
            </div>
        </div>
    );
};

ChatList.propTypes = {
    onSelectChat: PropTypes.func.isRequired,
};