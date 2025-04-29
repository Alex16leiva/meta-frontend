import styled from "styled-components";

export const ChatType = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
`;

export const ChatTypeSelected = styled.div`
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    color: rgba(98, 82, 82, 0.6);
    border-bottom: 3px solid transparent;
    background-color: #f0f2f5;
    padding: 10px;

    &.selected {
        border-bottom: 3px solid #FF4081; /* Color del borde cuando está seleccionado */
        background-color: #ddd;
        font-weight: bold;
        color: black;
    }
`