import styled from 'styled-components';
import { IUsersListEmpty } from './UsersList';

export const StyledUsersList = styled.ul<IUsersListEmpty>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: ${(props) => (props.isEmpty ? 'auto' : 'initial')};

    @media (min-width: 840px) {
        gap: initial;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        border-radius: 50px 10px 5px 5px;
    }
`;

export const StyledUsersMessage = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    align-self: center;
    margin: auto;

    .link-message {
        color: #485fc7;
        font-weight: 500;
        cursor: pointer;
        display: block;
    }
`;
