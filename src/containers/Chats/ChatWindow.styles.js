import styled from "styled-components";

export const ChatContainer = styled.div`
    width: 70%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
`;

export const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #00A884;
    border-bottom: 1px solid #e0e0e0;
    color: #fbfbfb;
`;

export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 15px;
`;

export const CategoriaContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 3px;
`;

export const Categoria = styled.div`
    background-color: #ddd;
    padding: 5px;
    font-weight: bold;
    border-radius: 5px;
`;

export const MessageList = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

export const DateDivider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 15px 0;
    
    span {
        background-color: #f0f2f5;
        padding: 5px 10px;
        font-size: 12px;
        color: #54656f;
        border-radius: 5px;
        font-weight: bold;
    }

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: #ddd;
        margin: 0 10px;
    }
`;

export const MessageContainer = styled.div`
    display: flex;
    justify-content: ${(props) => (props.sent ? "flex-end" : "flex-start")};
    margin: 5px 0;
`;

export const Message = styled.div`
    background-color: ${(props) => (props.sent ? "#d9fdd3" : "#ffffff")};
    color: #111b21;
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 60%;
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    word-break: break-word;
`;

export const Timestamp = styled.span`
    font-size: 12px;
    color: #54656f;
    align-self: flex-end;
    margin-top: 4px;
`;

export const InputArea = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    border-top: 1px solid #e0e0e0;
`;

export const Input = styled.input`
    flex-grow: 1;
    padding: 10px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    background-color: #f0f2f5;
    outline: none;
`;

export const SendButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    color: #54656f;
    font-size: 18px;

    &:hover {
        color: #25d366;
    }
`;
