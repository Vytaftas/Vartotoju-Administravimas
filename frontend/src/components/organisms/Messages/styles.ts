import styled from 'styled-components';

export const StyledMessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const StyledMessage = styled.div`
    color: white;
    padding: 10px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;

    &.success {
        background-color: green;
    }

    &.error {
        background-color: #eb4034;
    }

    .message-icon {
        font-size: 16px;
    }
`;
