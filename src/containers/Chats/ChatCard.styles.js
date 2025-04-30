// ChatCard.styles.js
import styled from 'styled-components';

export const ChatCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-top: 10px;
  background-color: ${({ selected }) => (selected ? '#F0F2F5' : '#ffffff')};
  color: '#F8F5E9';
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 2px solid ${({ selected }) => (selected ? '#F0F2F5' : 'transparent')};
  border-left: 10px solid orange; /* Línea naranja a la izquierda temporal mientras se define que onda!! */

  &:hover {
    background-color: ${({ selected }) => (selected ? '#dce8ff' : '#989FB1')};
    color: ${({ selected }) => (selected ? '#000000' : '#F8F5E9')};
    transform: scale(1.01);
  }
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background-color: #ddd;
  border-radius: 50%;
  flex-shrink: 0;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ChatContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const ChatTime = styled.span`
  font-size: 12px;
`;

export const ChatMessage = styled.p`
  font-size: 14px;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
