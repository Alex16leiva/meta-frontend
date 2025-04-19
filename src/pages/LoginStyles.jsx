import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: #f4f7fc;
`;

export const LoginCard = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
`;

export const Title = styled.h2`
    margin-bottom: 10px;
    color: #333;
`;

export const Subtitle = styled.p`
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    &:focus {
        outline: none;
        border-color: #4c6ef5;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    background: #4c6ef5;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
        background: #3b5bdb;
    }
`;