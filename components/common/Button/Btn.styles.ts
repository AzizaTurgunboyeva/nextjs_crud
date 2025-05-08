import Link from "next/link";
import styled from "styled-components";

export const ButtonWrapper = styled.button`
    height: 40px;
    width: fit-content;
    font-size: 14px;
    border: 1px solid #bc8e5b;
    border-radius: 8px;
    background-color: #bc8e5b;
    color: white;
    cursor: pointer;
    transition: .2s;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);

    &:hover {
        border: 1px solid rgb(187, 150, 108);
        background-color: rgb(187, 150, 108);
    }
    
    &:active {
        border: 1px solid  #bc8e5b95;
        background-color: #bc8e5b95;
    }
`;

export const LinkWrapper = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: fit-content;
    padding: 8px;
    text-decoration: none;
    font-size: 14px;
    border: 1px solid #bc8e5b;
    border-radius: 8px;
    background-color: #bc8e5b;
    color: white;
    cursor: pointer;
    transition: .2s;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);

    &:hover {
        border: 1px solid rgb(187, 150, 108);
        background-color: rgb(187, 150, 108);
    }
    
    &:active {
        border: 1px solid  #bc8e5b95;
        background-color: #bc8e5b95;
    }
`;