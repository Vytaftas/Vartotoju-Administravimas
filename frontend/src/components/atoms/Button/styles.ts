import styled from 'styled-components';
import { IButtonProps } from './Button';

export const StyledButton = styled.button<IButtonProps>`
    padding: 0.375rem 1.25rem;

    border: none;
    outline: none;
    background-color: ${(props) => (props.theme ? (props.$inverted ? props.theme.color : props.theme.background) : 'initial')};
    color: ${(props) => (props.theme ? (props.$inverted ? props.theme.background : props.theme.color) : 'initial')};
    border: 1px solid ${(props) => (props.theme ? (props.$inverted ? props.theme.background : props.theme.color) : 'initial')};
    border-radius: 3px;
    transition: 0.2s;
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
    font-size: ${(props) => (props.size ? props.size : '1rem')};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.theme ? (props.$inverted ? props.theme.background : props.theme.hovercolor) : 'initial')};
        color: ${(props) => (props.theme ? (props.$inverted ? props.theme.color : props.theme.color) : 'initial')};
        border: 1px solid ${(props) => (props.theme ? (props.$inverted ? props.theme.background : props.theme.color) : 'initial')};
    }
`;
