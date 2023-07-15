import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import { IChildren } from './types';

const Layout = ({ children }: IChildren) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </>
    );
};

export default Layout;
