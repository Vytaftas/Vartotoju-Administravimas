import { IColorTheme } from '../../../shared/theme/theme';
import { validateInputs } from '../../../shared/helpers/validate_inputs';
import { ModalContext } from '../../../App';
import { MutableRefObject, useRef, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewMessageContext } from '../../../App';

import { StyledAddUserForm, StyledInputsWrapper } from './styles';

import { BUTTON_TYPES } from '../../atoms/Button/types';
import { INPUT_TYPES } from '../../atoms/Input/types';
import { generateID } from '../../../shared/helpers/generate_id';

import db_requests, { IAddedUserResponse, IUserKeys } from '../../../shared/db/db_requests';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input';

interface IAddUserFormProps {
    theme: IColorTheme;
}

export interface IStyledAddUserFormProps {
    onSubmit: (e: SubmitEvent) => void;
}

const AddUserForm = ({ theme }: IAddUserFormProps) => {
    const nameRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const surnameRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const ageRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

    const { setIsOpen } = useContext(ModalContext);

    const { setNewMessage } = useContext(NewMessageContext);

    const userQuery = useQueryClient();

    const addUser = async (e: Event) => {
        e.preventDefault();

        const formData: IUserKeys = {
            name: nameRef.current?.value as string,
            surname: surnameRef.current?.value as string,
            email: emailRef.current?.value as string,
            age: ageRef.current?.value,
        };

        if (validateInputs(formData)) {
            const userdata = (await db_requests.addUser(formData)) as IAddedUserResponse;

            if (userdata && userdata.response) {
                setNewMessage(() => ({ text: userdata?.response?.data.message, id: generateID(), status: 'error' }));
            } else {
                setNewMessage(() => ({ text: userdata.message, id: generateID(), status: 'success' }));
            }

            setIsOpen(() => false);
        } else {
            setNewMessage(() => ({ text: 'Patikrinkite are įvestis teisinga.', id: generateID(), status: 'error' }));
        }
    };

    const addUserMutation = useMutation({
        mutationFn: addUser,
        onSuccess: async () => {
            await userQuery.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleInputChange = (e: MutableRefObject<HTMLInputElement | null>) => {
        const input = e?.current;

        if (input) {
            const key = input.id;

            switch (key) {
                case 'email': {
                    if (input.value.includes('@') && input.value.length > 0) {
                        input.classList.add('valid');
                        input.classList.remove('invalid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    }

                    break;
                }
                case 'age': {
                    if (input.value.trim().length > 0 && !isNaN(parseInt(input?.value))) {
                        input.classList.add('valid');
                        input.classList.remove('invalid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    }
                    break;
                }
                default: {
                    if (input.value.trim()) {
                        input.classList.add('valid');
                        input.classList.remove('invalid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    }

                    break;
                }
            }
        }
    };

    return (
        <StyledAddUserForm onSubmit={(e: SubmitEvent) => addUserMutation.mutate(e)}>
            <h3>Pridėti naują vartotoją</h3>
            <StyledInputsWrapper>
                <Input
                    currentRef={nameRef}
                    size={'18px'}
                    theme={theme}
                    type={INPUT_TYPES.text}
                    identifier='name'
                    placeholder='Vardas'
                    onChange={() => handleInputChange(nameRef)}
                />
                <Input
                    currentRef={surnameRef}
                    theme={theme}
                    type={INPUT_TYPES.text}
                    identifier='surname'
                    placeholder='Pavardė'
                    onChange={() => handleInputChange(surnameRef)}
                />
                <Input
                    currentRef={emailRef}
                    theme={theme}
                    type={INPUT_TYPES.email}
                    identifier='email'
                    placeholder='El. Paštas'
                    onChange={() => handleInputChange(emailRef)}
                />
                <Input
                    currentRef={ageRef}
                    theme={theme}
                    type={INPUT_TYPES.number}
                    identifier='age'
                    placeholder='Amžius'
                    onChange={() => handleInputChange(ageRef)}
                />
            </StyledInputsWrapper>
            <Button theme={theme} type={BUTTON_TYPES.submit} identifier='form-submit'>
                Pridėti
            </Button>
        </StyledAddUserForm>
    );
};

export default AddUserForm;
