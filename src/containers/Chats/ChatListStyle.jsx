import styled from "styled-components";

export const ChatType = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
`;

export const ChatTypeSelected = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; /* Cambiado a center */
    padding: 10px 15px;
    background-color: #f0f2f5;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #111b21;
    position: relative;
    gap: 8px; /* Añadimos espacio entre span y badge */

    &.selected {
        border-bottom: 3px solid #74b9ff; /* Color del borde cuando está seleccionado */
        background-color: #ddd;
        font-weight: bold;
        color: black;
    }
`;


export const Badge = styled.div`
    background-color: #74b9ff;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;