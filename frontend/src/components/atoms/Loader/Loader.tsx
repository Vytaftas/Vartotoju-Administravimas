import { IColorTheme } from '../../../shared/theme/theme';
import { StyledLoaderWrapper } from './styles';

const loaderIcons = {
    spinner: <i className='fa-solid fa-spinner'></i>,
    circle: <i className='fa-solid fa-circle-notch'></i>,
    arrows: <i className='fa-solid fa-arrows-spin'></i>,
    gear: <i className='fa-solid fa-gear'></i>,
};

export interface ILoaderProps {
    icon?: JSX.Element;
    backgroundClr?: string;
    fullScreen?: boolean;
    iconSize?: string;
    iconColor?: string;
    timingFunction?: string;
    direction?: string;
    theme?: IColorTheme;
}

const Loader = ({ icon, backgroundClr, fullScreen, iconSize, iconColor, timingFunction, direction, theme }: ILoaderProps) => {
    return (
        <StyledLoaderWrapper
            backgroundClr={backgroundClr}
            fullScreen={fullScreen}
            iconSize={iconSize}
            iconColor={iconColor}
            timingFunction={timingFunction}
            direction={direction}
            theme={theme}
        >
            {icon ? icon : loaderIcons.spinner}
        </StyledLoaderWrapper>
    );
};

export default Loader;
