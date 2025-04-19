import { createGlobalStyle } from "styled-components";
import { DEVICES, mediaDevices } from "./mediaDevices";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,100&display=swap");
/* @import url("https://fonts.googleapis.com/css2?family=Amaranth&family=Bree+Serif&family=Lato&display=swap"); */

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}

body {
    background: #ffffff;
    font-family: "Roboto", sans-serif;
    min-height: 100vh;
}

button,
span,
strong {
    font-size: 11px;
}

.inactive-scroll {
    overflow: hidden;
}

.active-scroll {
    overflow: auto;
}

.shimmer-effect {
    animation-duration: 2.2s;
    animation-fill-mode: backwards;
    animation-iteration-count: infinite;
    animation-name: shimmer-animation;
    animation-timing-function: linear;
    background: #ddd;
    background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
    background-size: 1200px 100%;
}

@-webkit-keyframes shimmer-animation {
    0% {
        background-position: -100% 0;
    }
    100% {
        background-position: 100% 0;
    }
}

@keyframes shimmer-animation {
    0% {
        background-position: -1200px 0;
    }
    100% {
        background-position: 1200px 0;
    }
}

.flicker-effect {
    background: #ebeaef;

    animation: flicker-animation 1s infinite;
}

@-webkit-keyframes flicker-animation {
    0% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}

@keyframes flicker-animation {
    0% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}


${mediaDevices.lessThan(DEVICES.small)} {
        ::-webkit-scrollbar {
            width: 0px;
            height: 0;
            background-color: #f5f5f5;
        }
    }

`;

export default GlobalStyle;
