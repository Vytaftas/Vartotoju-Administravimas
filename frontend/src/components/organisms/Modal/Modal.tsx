import { createPortal } from 'react-dom';
import { StyledModalContent, StyledModalOverlay } from './styles';
import { Dispatch } from 'react';
import { ISingleMessage } from '../../../App';

export interface IModalProps {
    children: JSX.Element | JSX.Element[];
    element: HTMLDivElement;
    isOpen: boolean;
    messages?: ISingleMessage[];
    setState: Dispatch<React.SetStateAction<boolean>>;
}

export interface IStyledModalContentProps {
    isMessages: boolean;
    isEmptyList?: boolean;
}

const Modal = ({ isOpen, children, element, setState, messages }: IModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <>
            <StyledModalOverlay isMessages={element.id === 'messages'} />
            <StyledModalContent isEmptyList={messages && messages.length > 0 ? false : true} isMessages={element.id === 'messages'}>
                <i className='fa-solid fa-xmark' onClick={() => setState(() => false)}></i>
                {children}
            </StyledModalContent>
        </>,
        element
    );
};

export default Modal;
