// ChatCard.jsx
import React from 'react';
import {
  ChatCardContainer,
  Avatar,
  ChatContent,
  ChatHeader,
  ChatName,
  ChatTime,
  ChatMessage,
} from './ChatCard.styles';
import { FormattedDate } from "../../components/Controls/FormattedDate";
import { FaUser } from 'react-icons/fa';

const ChatCard = ({ chat, onSelectChat, isSelected }) => {
  return (
    <ChatCardContainer
      key={chat.numeroTelefono}
      onClick={() => onSelectChat(chat)}
      selected={isSelected}
    >
      <Avatar>
        <FaUser style={{ color: 'white' }} size={30} />
      </Avatar>
      <ChatContent>
        <ChatHeader>
          <ChatName selected={isSelected}>{chat.nombre}</ChatName>
          <ChatTime>
            <FormattedDate dateString={chat.fechaUltimoMensajeRecibido} />
          </ChatTime>
        </ChatHeader>
        <ChatMessage>{chat.ultimoMensajeRecibido}</ChatMessage>
      </ChatContent>
    </ChatCardContainer>
  );
};

export default ChatCard;
