import { StyledMain } from './styles';
import { IChildren } from '../Layout/types';

const Main = ({ children }: IChildren) => {
    return <StyledMain>{children}</StyledMain>;
};

export default Main;
