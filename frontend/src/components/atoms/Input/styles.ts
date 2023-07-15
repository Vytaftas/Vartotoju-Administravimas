import styled from 'styled-components';
import { IInputProps } from './Input';

export const StyledInput = styled.input<IInputProps>`
    padding: 5px 10px;
    border-radius: 0px;
    border: none;
    outline: none;
    border-bottom: 1px solid ${(props) => (props.theme ? props.theme.background : 'initial')};
    font-size: ${(props) => (props.size ? props.size : '16px')};

    &.invalid {
        border-color: red;
    }
    &.valid {
        border-color: green;
    }
`;
