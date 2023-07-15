import styled from 'styled-components';
import { IStyledAddUserFormProps } from './AddUserForm';

export const StyledAddUserForm = styled.form<IStyledAddUserFormProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h3 {
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: 600;
    }

    @media (min-width: 840px) {
    }
`;
export const StyledInputsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 35px;
    margin-bottom: 50px;
    width: 100%;

    @media (min-width: 840px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 50px 50px;
        margin-bottom: 50px;
        width: 100%;
    }
`;
