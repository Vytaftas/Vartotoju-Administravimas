import styled from 'styled-components';
import { IListItemProps } from './ListItem';

export const StyledListItem = styled.li<IListItemProps>`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    width: 100%;
    transition: 0.3s;
    box-shadow: 0 3px 10px 0 lightgray;
    background-color: #00054010;
    border: 2px solid white;

    .user-info-wrapper {
        width: 100%;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(1, 1fr);
        text-align: right;
        background-color: #000540;
        color: white;
        padding: 20px;
        border-radius: 0 5px 0 0;

        .invalid {
            border-color: red;
        }
        .valid {
            border-color: green;
        }
    }

    .user-mobile-headings {
        text-align: left;
        font-weight: 600;
        background-color: #000540;
        color: white;
        padding: 20px;
        border-radius: 5px 0 0 0;
    }

    &.table-heading-wrapper {
        display: none;
    }

    .user-edit-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 10px;
        grid-column: 1 / span 2;
        padding: 20px;
        border-top: 2px solid white;
    }

    .heading-text {
        font-size: 16px;
        font-weight: 500;
    }

    .delete-alert {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        & > div {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
    }

    .editing {
        border: none;
        outline: none;
        border-bottom: 1px solid black;
    }

    @media (min-width: 840px) {
        grid-template-columns: 1fr 200px;
        padding: 10px 20px;
        gap: 20px;
        border: none;
        box-shadow: initial;

        &:nth-child(even) {
            background-color: initial;
        }

        .user-info-wrapper {
            gap: 50px;
            grid-template-columns: repeat(4, 1fr);
            text-align: left;

            background-color: transparent;
            color: initial;
            padding: 0;
            border-radius: 0;
        }

        &.table-heading-wrapper {
            display: grid;
            background-color: #000540;
            color: white;
            padding: 20px 20px;
            border-radius: 10px 10px 0 0;
        }

        &.table-heading-wrapper p {
            color: white;
        }

        .user-mobile-headings {
            display: none;
        }

        .user-edit-wrapper {
            grid-column: initial;
            justify-content: end;
            padding: 0;
            border-top: none;
        }
    }
`;
