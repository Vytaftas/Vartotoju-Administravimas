import styled from 'styled-components';

export const StyledMain = styled.main`
    max-width: 1040px;
    margin: 0 auto;
    padding: 30px 20px;
    min-height: 85vh;
    display: flex;
    flex-direction: column;

    @media (min-width: 840px) {
        padding: 40px;
    }
`;
