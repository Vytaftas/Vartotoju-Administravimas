import styled from 'styled-components';
import { IStyledPagination } from './Pagination';

export const StyledPaginationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 840px) {
        padding: 20px 0;

        &.mobile-pagination {
            display: none;
        }
    }
`;

export const StyledPaginationsContainer = styled.div<IStyledPagination>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .pagination {
        cursor: pointer;
        font-weight: 400;
        border-bottom: 1px solid transparent;
        font-size: 18px;
        line-height: 1.2em;
    }

    .pagination:hover {
        color: ${(props) => (props.theme ? props.theme.background : '#000540')};
        border-bottom: 1px solid ${(props) => (props.theme ? props.theme.background : '#000540')};
    }

    .pagination.current {
        font-weight: 500;
        color: ${(props) => (props.theme ? props.theme.background : '#000540')};
        border-bottom: 1px solid ${(props) => (props.theme ? props.theme.background : '#000540')};
    }

    @media (min-width: 840px) {
        font-size: 16px;
    }
`;
