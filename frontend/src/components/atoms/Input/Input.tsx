import { IColorTheme } from '../../../shared/theme/theme';
import { StyledInput } from './styles';
import { INPUT_TYPES } from './types';
import { MutableRefObject, ChangeEvent } from 'react';

export interface IInputProps {
    type: INPUT_TYPES;
    theme?: IColorTheme;
    disabled?: boolean;
    identifier?: string;
    onChange?: (e: ChangeEvent) => void;
    size?: string;
    fontWeight?: string;
    placeholder?: string;
    currentRef?: MutableRefObject<HTMLInputElement | null>;
}

const Input = ({ type, theme, disabled, identifier, onChange, size, fontWeight, placeholder, currentRef }: IInputProps) => {
    return (
        <StyledInput
            placeholder={placeholder}
            disabled={disabled}
            id={identifier}
            className={identifier}
            onChange={onChange}
            size={size}
            fontWeight={fontWeight}
            type={type}
            theme={theme}
            ref={currentRef}
        />
    );
};

export default Input;
