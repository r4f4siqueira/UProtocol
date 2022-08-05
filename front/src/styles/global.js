import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        font-family: "Roboto", sans-serif;
        letter-spacing: 1.5px;
    }

    html,
    body,
    #root {
        height: 100%;
        -webkit-font-smoothing: antialiased;
        scroll-behavior: smooth;
    }

    body{
        
        ::-webkit-scrollbar{
            display: none;
        }
    }

    button{
        cursor: pointer;
        border: none;
    }

    a, a:-webkit-any-link {
        text-decoration: none;
    }
    ul, li{
        list-style: none;
    }
`;
