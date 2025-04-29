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
    border-bottom: 3px solid transparent;
    background-color: #f0f2f5;
    padding: 10px;

    &.selected {
        border-bottom: 3px solid #0984e3; /* Color del borde cuando está seleccionado */
        background-color: #ddd
    }
`