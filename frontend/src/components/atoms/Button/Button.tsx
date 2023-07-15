import { IColorTheme } from '../../../shared/theme/theme';
import { StyledButton } from './styles';
import { BUTTON_TYPES } from './types';

export interface IButtonProps {
    theme?: IColorTheme;
    $inverted?: boolean;
    disabled?: boolean;
    identifier?: string;
    onClick?: () => void;
    size?: string;
    fontWeight?: string;
    children: string;
    type: BUTTON_TYPES;
}

const Button = ({ theme, disabled, identifier, onClick, $inverted, size, fontWeight, children, type }: IButtonProps) => {
    return (
        <StyledButton
            type={type}
            fontWeight={fontWeight}
            $inverted={$inverted}
            onClick={onClick}
            className={identifier}
            disabled={disabled}
            theme={theme}
            size={size}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
