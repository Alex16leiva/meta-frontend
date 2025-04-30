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
    justify-content: space-between;
    padding: 8px 12px;

    background-color: #00A884;
    border-bottom: 1px solid #e0e0e0;
    color: #fbfbfb;
        font-size: 14px;           // Letra más pequeña
    font-weight: 100; 
`;


export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// export const AvatarIcon = styled(FaUser)`
//     color: black; // Color negro
//     font-size: 20px; // Ajusta el tamaño del ícono dentro del círculo
// `;

export const CategoriaContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
    padding: 10px 0; // 👈 Padding arriba y abajo

`;

export const Categoria = styled.div`
    background-color: #ddd;
    padding: 6px 12px;         // Padding horizontal y vertical
    font-size: 14px;           // Letra más pequeña
    font-weight: 500;          // Un poco menos pesado que "bold"
    border-radius: 20px;       // Más redondo
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #ccc;
        transform: scale(1.05);
    }
`;

export const MessageList = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #EFEAE2; // Color tipo WhatsApp
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
        font-size: 13px;
        color: #54656f;
        border-radius: 5px;
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
    padding-left: ${(props) => (props.sent ? "10px" : "30px")};  // Ajusta margen izquierdo para mensajes recibidos
    padding-right: ${(props) => (props.sent ? "30px" : "10px")}; // Ajusta margen derecho para mensajes enviados
`;

export const Message = styled.div`
    background-color: ${(props) => (props.sent ? "#dcf8c6" : "#ffffff")}; /* Color de fondo tipo WhatsApp */
    color: #111b21;
    padding: 8px 16px; /* Espaciado dentro del mensaje */
    border-radius: 18px; /* Bordes redondeados más suaves */
    max-width: 60%;
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    word-break: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil para dar profundidad */
    margin-bottom: 8px; /* Margen inferior para separar los mensajes */

    /* Cola para los mensajes enviados */
    ${(props) =>
        props.sent &&
        `
            &::after {
                content: '';
                position: absolute;
                right: -10px;
                top: 50%;
                border: 10px solid transparent;
                border-left-color: #dcf8c6; /* El color del mensaje enviado */
                border-right: none;
                border-top: none;
                border-bottom: none;
                transform: translateY(-50%);
                z-index: 1;
            }
    `}

    /* Cola para los mensajes recibidos */
    ${(props) =>
        !props.sent &&
        `
            &::before {
                content: '';
                position: absolute;
                left: -10px;
                top: 50%;
                border: 10px solid transparent;
                border-right-color: #ffffff; /* El color del mensaje recibido */
                border-left: none;
                border-top: none;
                border-bottom: none;
                transform: translateY(-50%);
                z-index: 1;
            }
    `}
`;

export const Timestamp = styled.div`
    font-size: 12px;
    color: #aaa;
    margin-top: 4px;
    align-self: flex-end; /* Alinea la hora a la derecha */
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



export const IconGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: white; // puedes personalizar
  font-size: 16px;
`;
