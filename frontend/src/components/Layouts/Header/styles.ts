import styled from 'styled-components';
import { IStyledIconProps } from './Header';

export const StyledHeader = styled.header`
    background-color: #000540;
    min-height: 8vh;
    display: flex;
    align-items: center;
`;

export const StyledHeaderInner = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 1040px;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    input {
        width: 100%;
        border-radius: 5px;
        border: none;
    }

    button {
        display: none;
    }

    @media (min-width: 840px) {
        padding: 15px 40px;
        flex-direction: row;
        gap: initial;

        input {
            width: 30%;
        }

        button {
            display: inline-block;
        }
    }
`;

export const StyledIcon = styled.i<IStyledIconProps>`
    font-size: 16px;
    width: 32px;
    height: 32px;
    color: ${(props) => (props.theme ? props.theme.color : 'initial')};
    background-color: ${(props) => (props.theme ? props.theme.background : 'initial')};
    cursor: pointer;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${(props) => (props.theme ? props.theme.color : 'initial')};
    transition: 0.2s;

    &:hover {
        background-color: ${(props) => (props.theme ? props.theme.hovercolor : 'initial')};
    }

    @media (min-width: 840px) {
        &.mobile-modal-open {
            display: none;
        }
    }
`;
