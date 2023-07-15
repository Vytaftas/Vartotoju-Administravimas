import Layout from './components/Layouts/Layout';
import Modal from './components/organisms/Modal';
import UsersList from './components/organisms/UsersList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, createContext } from 'react';
import { theme } from './shared/theme/theme';
import AddUserForm from './components/organisms/AddUserForm';
import Messages from './components/organisms/Messages';

import { Dispatch, SetStateAction } from 'react';

type ModalContextType = {
    isOpen?: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const iModalContextState = {
    isOpen: false,
    setIsOpen: () => {
        return null;
    },
};

type SearchContextType = {
    searchValue?: string | undefined;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const iSearchContextState = {
    searchValue: '',
    setSearchValue: () => {
        return null;
    },
};

type NewMessageContextType = {
    newMessage: ISingleMessage;
    setNewMessage: Dispatch<SetStateAction<ISingleMessage>>;
};

const iNewMessageContextState = {
    newMessage: { text: '', id: '', status: '' },
    setNewMessage: () => {
        return null;
    },
};

export interface ISingleMessage {
    text: string | undefined;
    id: string;
    status: string;
}

export const ModalContext = createContext<ModalContextType>(iModalContextState);
export const SearchContext = createContext<SearchContextType>(iSearchContextState);
export const NewMessageContext = createContext<NewMessageContextType>(iNewMessageContextState);

const usersQueryClient = new QueryClient();

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [newMessage, setNewMessage] = useState<ISingleMessage>({ text: '', id: '', status: '' });
    const [messages, setMessages]: [ISingleMessage[], Dispatch<SetStateAction<ISingleMessage[]>>] = useState<ISingleMessage[]>([]);

    return (
        <QueryClientProvider client={usersQueryClient}>
            <ModalContext.Provider value={{ setIsOpen }}>
                <NewMessageContext.Provider value={{ newMessage, setNewMessage }}>
                    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                        <Layout>
                            <UsersList />
                        </Layout>
                        <Modal
                            messages={messages}
                            element={document.getElementById('messages') as HTMLDivElement}
                            setState={setIsMessagesOpen}
                            isOpen={isMessagesOpen}
                        >
                            <Messages messagesState={{ messages, setMessages }} />
                        </Modal>
                        <Modal element={document.getElementById('modal') as HTMLDivElement} setState={setIsOpen} isOpen={isOpen}>
                            <AddUserForm theme={theme} />
                        </Modal>
                    </SearchContext.Provider>
                </NewMessageContext.Provider>
            </ModalContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
