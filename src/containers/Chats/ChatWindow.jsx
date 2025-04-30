"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import * as signalR from "@microsoft/signalr"
import PropTypes from "prop-types"
import {
    ChatContainer,
    ChatHeader,
    Avatar,
    MessageList,
    DateDivider,
    Message,
    InputArea,
    Input,
    SendButton,
    MessageContainer,
    Timestamp,
    Categoria,
    CategoriaContainer,
    IconGroup
} from "./ChatWindow.styles";
import { FormattedDate } from "../../components/Controls/FormattedDate"
import { FaUser, FaClock, FaCalendarCheck, FaExclamation } from 'react-icons/fa';

export const ChatWindow = ({ selectedChat }) => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const messageListRef = useRef(null)

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7013/chatHub")
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build()

        newConnection
            .start()
            .then(() => console.log("✅ Connect to SignalR"))
            .catch((err) => console.error("❌ Error trying to connect to SignalR:", err))

        newConnection.on("ReceiveMessage", (user, message, fileUrl, fileType) => {
            setMessages((prev) => [
                ...prev,
                {
                    numeroTelefono: user,
                    texto: message,
                    fileUrl,
                    fileType,
                    fechaTransaccion: new Date().toISOString(),
                },
            ])
            scrollToBottom()
        })

        return () => {
            newConnection.stop()
        }
    }, [])

    useEffect(() => {
        if (selectedChat) {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(
                        `https://localhost:7013/api/whatsapp/obtener-mensaje-por-numero?numeroTelefono=${selectedChat.numeroTelefono}`,
                    )
                    const data = await response.json()
                    setMessages(data)
                    scrollToBottom()
                } catch (error) {
                    console.error("Error fetching messages:", error)
                }
            }

            fetchMessages()
        }
    }, [selectedChat])

    useEffect(() => {
        scrollToBottom()
    }, [])

    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight
        }
    }

    const handleSend = async () => {
        if (!newMessage.trim()) return

        const now = new Date();
        const formattedTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

        const newMsg = {
            id: messages.length + 1,
            texto: newMessage,
            tipoMensaje: "Enviado",
            fechaTransaccion: now.toISOString(),
            hora: formattedTime,
        }

        setMessages((prevMessages) => [...prevMessages, newMsg])
        setNewMessage("")
        scrollToBottom()

        try {
            await fetch("https://localhost:7013/api/whatsapp/enviar-mensaje", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requestUserInfo: {
                        usuarioId: "react",
                    },
                    mensajeEncabezado: {
                        numeroTelefono: selectedChat.numeroTelefono,
                        mensajeDetalle: [
                            {
                                numeroTelefono: selectedChat.numeroTelefono,
                                tipoMensaje: "Enviado",
                                texto: newMessage,
                            },
                        ],
                    },
                }),
            })
        } catch (error) {
            console.error("Error sending message:", error)
        }
    }

    const isValidDate = (dateString) => {
        const date = new Date(dateString)
        return date instanceof Date && !isNaN(date)
    }

    const getDateString = (date) => {
        return date.toISOString().split("T")[0]
    }

    const groupMessagesByDate = (messages) => {
        const groups = {}
        messages.forEach((message) => {
            if (!message.fechaTransaccion || !isValidDate(message.fechaTransaccion)) {
                message.fechaTransaccion = new Date().toISOString()
            }
            const date = new Date(message.fechaTransaccion)
            const dateStr = getDateString(date)
            if (!groups[dateStr]) {
                groups[dateStr] = []
            }
            groups[dateStr].push(message)
        })
        return groups
    }

    const formatDate = (dateStr) => {
        try {
            const today = new Date()
            const date = new Date(dateStr)

            if (!isValidDate(dateStr)) {
                return "Fecha desconocida"
            }

            const todayString = getDateString(today)
            const dateString = getDateString(date)

            if (todayString === dateString) {
                return "Hoy"
            }

            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            const yesterdayString = getDateString(yesterday)

            if (yesterdayString === dateString) {
                return "Ayer"
            }

            return date.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        } catch (error) {
            console.error("Error formatting date:", error)
            return "Fecha desconocida"
        }
    }

    const sortedMessages = messages.sort((a, b) => {
        return new Date(a.fechaTransaccion) - new Date(b.fechaTransaccion)
    })

    const messageGroups = groupMessagesByDate(sortedMessages)
    const sortedDates = Object.keys(messageGroups).sort()

    return (
        <ChatContainer>
            {selectedChat ? (
                <>
                    <ChatHeader>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Avatar>
                            <FaUser style={{ color: 'white' }} size={24} />
                        </Avatar>
                            <h2>{selectedChat.nombre}</h2>
                        </div>

                        <IconGroup>
                            <FaClock />
                            <FaCalendarCheck style={{ marginLeft: '12px' }} />
                            <FaExclamation style={{ marginLeft: '12px' }} />
                        </IconGroup>
                    </ChatHeader>
                    <CategoriaContainer>
                        <Categoria>
                            Informacion
                        </Categoria>
                        <Categoria>
                            Alquiler
                        </Categoria>
                        <Categoria>
                            Ventas de Carro
                        </Categoria>
                    </CategoriaContainer>
                    {/* <hr style={{ border: '1px solid #ddd', margin: '5px 0' }} /> */}
                    <MessageList ref={messageListRef}>
                        {sortedDates.map((date) => (
                            <div key={date}>
                                <DateDivider>
                                    <span>{formatDate(date)}</span>
                                </DateDivider>

                                {messageGroups[date].map((message, index) => (
                                    <MessageContainer key={`${date}-${index}`} sent={message.tipoMensaje === "Enviado"}>
                                        <Message sent={message.tipoMensaje === "Enviado"}>
                                            <span>{message.texto}</span>
                                            <Timestamp>
                                                <FormattedDate dateString={message.fechaTransaccion} />
                                            </Timestamp>
                                        </Message>
                                    </MessageContainer>
                                ))}
                            </div>
                        ))}
                    </MessageList>
                    <InputArea>
                        <Input
                            type="text"
                            placeholder="Escribe un mensaje aquí..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        />
                        <SendButton onClick={handleSend}>
                            <Send />
                        </SendButton>
                    </InputArea>
                </>
            ) : (
                <p>Selecciona un chat para comenzar</p>
            )}
        </ChatContainer>
    );
};

ChatWindow.propTypes = {
    selectedChat: PropTypes.object,
};