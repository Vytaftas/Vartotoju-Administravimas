import { useEffect, useContext } from 'react';
import { ISingleMessage, NewMessageContext } from '../../../App';
import { Dispatch, SetStateAction } from 'react';
import { StyledMessage, StyledMessagesWrapper } from './styles';

interface INewMessageState {
    messagesState: {
        messages?: ISingleMessage[];
        setMessages: Dispatch<SetStateAction<{ text: string | undefined; id: string; status: string }[]>>;
    };
}

interface INewMessage {
    text: string | undefined;
    id: string;
}

const Messages = ({ messagesState }: INewMessageState) => {
    const { messages, setMessages } = messagesState;
    const { newMessage } = useContext(NewMessageContext);

    useEffect(() => {
        const { id, text } = newMessage as INewMessage;

        if (newMessage && text) {
            setMessages((prev) => [...prev, newMessage]);

            setTimeout(() => {
                setMessages((prev) => prev.filter((message) => message.id !== id));
            }, 5000);
        }
    }, [newMessage, setMessages]);

    if (messages && messages.length) {
        return (
            <StyledMessagesWrapper>
                {messages.map((message) => {
                    return (
                        <StyledMessage key={message.id} className={`${message.status === 'error' ? 'error' : 'success'}`}>
                            {<i className={`fa-solid message-icon ${message.status === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}`}></i>}
                            {message.text}
                        </StyledMessage>
                    );
                })}
            </StyledMessagesWrapper>
        );
    }
};

export default Messages;
