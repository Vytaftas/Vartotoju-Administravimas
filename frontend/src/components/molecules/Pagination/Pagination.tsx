import { IColorTheme } from '../../../shared/theme/theme';
import { StyledPaginationWrapper, StyledPaginationsContainer } from './styles';
import { Dispatch, SetStateAction } from 'react';
import { MouseEvent } from 'react';

export interface IPaginationProps {
    pages: number;
    currentPage: number;
    theme?: IColorTheme;
    mobileClass?: string;
    onPaginationClick: Dispatch<SetStateAction<number>>;
}

export interface IStyledPagination {
    theme?: IColorTheme;
}

const Pagination = ({ pages, onPaginationClick, theme, currentPage, mobileClass }: IPaginationProps) => {
    const handlePaginationClick = (e: MouseEvent<HTMLParagraphElement>, num: number) => {
        const target = e.target as HTMLParagraphElement;
        const paginations = document.querySelectorAll('.pagination');

        paginations.forEach((pag) => pag.classList.remove('current'));

        if (target) target?.classList?.add('current');

        onPaginationClick(() => num);
    };

    const createPagination = (pages: number) => {
        const pagesArray: number[] = [];

        for (let i = 0; i < pages; i++) {
            pagesArray.push(i);
        }
        if (pages > 1)
            return pagesArray.map((num, index) => {
                if (pagesArray.length > 5) {
                    if (
                        index === currentPage + 1 ||
                        index === currentPage - 1 ||
                        index === currentPage ||
                        index === pagesArray.length - 1 ||
                        index === 0
                    ) {
                        return (
                            <p key={num} className={`pagination ${index === 0 ? 'current' : ''}`} onClick={(e) => handlePaginationClick(e, num)}>
                                {num + 1}
                            </p>
                        );
                    } else {
                        if (index + 2 === currentPage || index - 2 === currentPage) {
                            return <p key={num}>...</p>;
                        }
                    }
                } else {
                    return (
                        <p key={num} className={`pagination ${index === 0 ? 'current' : ''}`} onClick={(e) => handlePaginationClick(e, num)}>
                            {num + 1}
                        </p>
                    );
                }
            });
    };

    return (
        <StyledPaginationWrapper className={mobileClass} theme={theme}>
            <StyledPaginationsContainer theme={theme}>{createPagination(pages)}</StyledPaginationsContainer>
        </StyledPaginationWrapper>
    );
};

export default Pagination;
