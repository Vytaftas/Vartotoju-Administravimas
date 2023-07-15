import styled from 'styled-components';
import { IStyledModalContentProps } from './Modal';

export const StyledModalOverlay = styled.div<IStyledModalContentProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: ${(props) => (props.isMessages ? 'none' : 'initial')};
`;

export const StyledModalContent = styled.div<IStyledModalContentProps>`
    background-color: white;
    padding: ${(props) => (props.isMessages ? '20px' : '20px 30px')};
    border-radius: 3px;
    box-shadow: 0 20px 30px 0 lightgray;
    box-shadow: ${(props) => (props.isMessages ? 'none' : '0 20px 30px 0 lightgray')};
    position: fixed;
    top: ${(props) => (props.isMessages ? 'unset' : '50%')};
    left: ${(props) => (props.isMessages ? 'unset' : '50%')};
    bottom: ${(props) => (props.isMessages ? '0' : 'unset')};
    right: ${(props) => (props.isMessages ? '0' : 'unset')};
    z-index: 1000;
    transform: ${(props) => (props.isMessages ? 'unset' : 'translate(-50%, -50%)')};
    width: ${(props) => (props.isMessages ? 'unset' : '90%')};
    max-width: 600px;
    position: fixed;
    background-color: ${(props) => (props.isMessages ? 'transparent' : 'white')};
    display: ${(props) => (props.isMessages && props.isEmptyList ? 'none' : 'block')};

    .fa-solid.fa-xmark {
        position: absolute;
        right: 0;
        top: 0;
        padding: 10px;
        cursor: pointer;
        transition: 0.3s;
        display: ${(props) => (props.isMessages ? 'none' : 'initial')};
    }

    i:hover {
        color: #485fc7;
    }

    @media (min-width: 840px) {
        width: ${(props) => (props.isMessages ? 'unset' : '100%')};
        padding: ${(props) => (props.isMessages ? '20px' : '20px 50px')};
    }
`;
