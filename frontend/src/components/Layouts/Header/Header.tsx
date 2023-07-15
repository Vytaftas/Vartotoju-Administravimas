import Button from '../../atoms/Button';
import { IColorTheme, theme } from '../../../shared/theme/theme';
import { StyledHeader, StyledHeaderInner, StyledIcon } from './styles';
import { useContext } from 'react';
import { ModalContext } from '../../../App';
import Input from '../../atoms/Input';
import { INPUT_TYPES } from '../../atoms/Input/types';
import { SearchContext } from '../../../App';
import { ChangeEvent } from 'react';
import { BUTTON_TYPES } from '../../atoms/Button/types';

export interface IStyledIconProps {
    theme: IColorTheme;
    className: string;
    onClick: () => void;
}

const Header = () => {
    const { setIsOpen } = useContext(ModalContext);
    const { setSearchValue } = useContext(SearchContext);

    const handleSearchInput = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(() => target.value);
    };

    return (
        <StyledHeader>
            <StyledHeaderInner>
                <Input theme={theme} type={INPUT_TYPES.search} placeholder='Paieška..' onChange={handleSearchInput} />
                <div>
                    <StyledIcon theme={theme} className='fa-solid fa-plus mobile-modal-open' onClick={() => setIsOpen(() => true)}></StyledIcon>
                </div>
                <Button type={BUTTON_TYPES.button} theme={theme} size='14px' onClick={() => setIsOpen(() => true)}>
                    Pridėti naują
                </Button>
            </StyledHeaderInner>
        </StyledHeader>
    );
};

export default Header;
