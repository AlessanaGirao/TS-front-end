import styled from 'styled-components'

export const ProductContainer = styled.div`
    padding: 16px;
    background-color: #f5f5f5;
    border: 1px solid #000;
    margin-bottom: 20px;
`;

export const ProductImage = styled.img`
    width: 100%;
    max-width: 200px;
    height: auto;
`;

export const CardButton = styled.button`
    background-color: #3490dc;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;

    &:hover{
        background-color: #2779bd;
    }
`;

