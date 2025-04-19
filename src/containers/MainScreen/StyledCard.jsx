import styled from "styled-components";

const widthCard = 180;
const heightCard = 120;

export const StyledCard = styled.div`
width: ${widthCard}px;
height: ${heightCard}px;
background: #fff;
align-content: center;
text-align: center;
animation-name: title;
animation-duration: 1s;
animation-iteration-count:0.5;

@keyframes title {
    0% {
        opacity: 0;
    }
    30% {
        opacity: 0.5;
    }
    80 {
        opacity: 1;
    }
    100 {
        opacity: 0;
    }
}

:hover {
    background: ${props => props.$backgroundColor || '#fff'};
    background-color: ${props => props.$backgroundColor || '#fff'};
    color: #fff;

    cursor: pointer;
    -webkit-transition: background-color 0.2s ease-out;
    -moz-transition: background-color 0.2s ease-out;
    -o-transition: background-color 0.2s ease-out;
    transition: background-color 0.2s ease-out;

    svg {
        g {
            path {
                fill: #fff;
            }
        }
    }

    h3 {
        color: #fff;
        b {
            color: #fff;
        }
    }
}

    .card1 {
        width: ${widthCard}px;
        height: ${heightCard}px;     
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`