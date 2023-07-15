import { StyledFooter } from './styles';

const Footer = () => {
    return (
        <StyledFooter>
            <p>{`© ${new Date().getFullYear()} Visos teisės saugomos `}</p>
        </StyledFooter>
    );
};

export default Footer;
