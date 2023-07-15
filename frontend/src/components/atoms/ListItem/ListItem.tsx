import { StyledListItem } from './style';
import { BUTTON_TYPES } from '../Button/types';
import { IColorTheme } from '../../../shared/theme/theme';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { MutableRefObject, useRef, useState, useContext } from 'react';
import { validateInputs } from '../../../shared/helpers/validate_inputs';
import { NewMessageContext } from '../../../App';
import { generateID } from '../../../shared/helpers/generate_id';
import db_requests, { IUpdatedUserResponse, IUserKeys } from '../../../shared/db/db_requests';

import Button from '../Button/Button';

export interface IListItemProps {
    data?: IUserKeys;
    theme: IColorTheme;
}

const ListItem = ({ data, theme }: IListItemProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const userQuery = useQueryClient();
    const { setNewMessage } = useContext(NewMessageContext);

    const nameRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null);
    const surnameRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null);
    const emailRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null);
    const ageRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null);

    const lastValue: IUserKeys = {
        name: nameRef.current?.innerText as string,
        surname: surnameRef.current?.innerText as string,
        email: emailRef.current?.innerText as string,
        age: parseInt(ageRef?.current?.innerText as string),
    };

    const handleUserDelete = async (id: string | undefined) => {
        const deletedUser = (await db_requests.deleteUser(id as string)) as IUpdatedUserResponse;

        if (deletedUser && deletedUser.response) {
            setNewMessage(() => ({ text: deletedUser?.response?.data.message, id: generateID(), status: 'error' }));
        } else {
            setNewMessage(() => ({ text: deletedUser?.message, id: generateID(), status: 'success' }));
        }
    };

    const handleUserDeleteCancel = () => {
        setNewMessage(() => ({ text: 'Vartotojo šalinimas atšauktas.', id: generateID(), status: 'error' }));
        setIsDeleting(() => false);
    };

    const handleUserUpdate = async (id: string | undefined) => {
        const userData: IUserKeys = {
            name: nameRef.current?.innerText as string,
            surname: surnameRef.current?.innerText as string,
            email: emailRef.current?.innerText as string,
            age: ageRef.current?.innerText,
        };

        if (validateInputs(userData)) {
            const updatedUser = (await db_requests.updateUser(id as string, userData)) as IUpdatedUserResponse;

            if (updatedUser && updatedUser.response) {
                setNewMessage(() => ({ text: updatedUser?.response?.data.message, id: generateID(), status: 'error' }));
            } else {
                setNewMessage(() => ({ text: updatedUser.message, id: generateID(), status: 'success' }));
            }
            setIsEditing(() => false);
        } else {
            setNewMessage(() => ({ text: 'Patikrinkite are įvestis teisinga.', id: generateID(), status: 'error' }));
        }
    };

    const handleUserUpdateCancel = () => {
        if (nameRef && nameRef.current && nameRef.current.innerText !== lastValue['name']) nameRef.current.innerText = lastValue['name'];
        if (surnameRef && surnameRef.current && surnameRef.current.innerText !== lastValue['surname'])
            surnameRef.current.innerText = lastValue['surname'];
        if (emailRef && emailRef.current && emailRef.current.innerText !== lastValue['email']) emailRef.current.innerText = lastValue['email'];
        if (ageRef && ageRef.current && lastValue['age'] && ageRef.current.innerText !== lastValue['age']?.toString())
            ageRef.current.innerText = lastValue['age'].toString();

        setNewMessage(() => ({ text: 'Redagavimas atšauktas.', id: generateID(), status: 'error' }));

        setIsEditing(() => false);
    };

    const deleteUserMutation = useMutation({
        mutationFn: handleUserDelete,
        onSuccess: async () => {
            await userQuery.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: handleUserUpdate,
        onSuccess: async () => {
            await userQuery.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleDataChange = (inp: HTMLParagraphElement | null, key: string) => {
        if (inp)
            switch (key) {
                case 'email': {
                    if (inp.innerText.includes('@') && inp.innerText.trim().length > 0) {
                        inp.classList.add('valid');
                        inp.classList.remove('invalid');
                    } else {
                        inp.classList.remove('valid');
                        inp.classList.add('invalid');
                    }

                    break;
                }
                case 'number': {
                    if (inp.innerText.trim().length > 0 && !isNaN(Number(inp.innerText))) {
                        inp.classList.add('valid');
                        inp.classList.remove('invalid');
                    } else {
                        inp.classList.remove('valid');
                        inp.classList.add('invalid');
                    }
                    break;
                }
                default: {
                    if (inp.innerText.trim()) {
                        inp.classList.add('valid');
                        inp.classList.remove('invalid');
                    } else {
                        inp.classList.remove('valid');
                        inp.classList.add('invalid');
                    }

                    break;
                }
            }
    };

    return (
        <StyledListItem theme={theme} className='table-row'>
            <div className='user-info-wrapper user-mobile-headings'>
                <div className='table-column'>
                    <p>Vardas:</p>
                </div>
                <div className='table-column'>
                    <p>Pavardė:</p>
                </div>
                <div className='table-column'>
                    <p>El. Paštas:</p>
                </div>
                <div className='table-column'>
                    <p>Amžius:</p>
                </div>
            </div>

            <div className='user-info-wrapper'>
                <div className='table-column'>
                    <p
                        onInput={() => handleDataChange(nameRef?.current, 'text')}
                        ref={nameRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        className={data && `${data.name}-text ${isEditing ? 'editing' : ''}`}
                    >
                        {data?.name}
                    </p>
                </div>
                <div className='table-column'>
                    <p
                        onInput={() => handleDataChange(surnameRef?.current, 'text')}
                        ref={surnameRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        className={data && `${data.surname}-text ${isEditing ? 'editing' : ''}`}
                    >
                        {data?.surname}
                    </p>
                </div>
                <div onInput={() => handleDataChange(emailRef?.current, 'email')} className='table-column'>
                    <p
                        ref={emailRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        className={data && `${data.email}-text ${isEditing ? 'editing' : ''}`}
                    >
                        {data?.email}
                    </p>
                </div>
                <div onInput={() => handleDataChange(ageRef?.current, 'number')} className='table-column'>
                    <p
                        ref={ageRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        className={data && `${data.age ? data.age : ''}-text ${isEditing ? 'editing' : ''}`}
                    >
                        {data?.age}
                    </p>
                </div>
            </div>

            <div className='user-edit-wrapper'>
                {!isDeleting && !isEditing && (
                    <>
                        <Button $inverted={true} size='14px' type={BUTTON_TYPES.button} theme={theme} onClick={() => setIsEditing(() => true)}>
                            Redaguoti
                        </Button>
                        <Button $inverted={true} size='14px' type={BUTTON_TYPES.button} theme={theme} onClick={() => setIsDeleting(() => true)}>
                            Ištrinti
                        </Button>
                    </>
                )}
                {isDeleting && (
                    <div className='delete-alert'>
                        <p>Ar tikrai norite ištrinti?</p>
                        <div>
                            <Button
                                $inverted={true}
                                size='14px'
                                type={BUTTON_TYPES.button}
                                theme={theme}
                                onClick={() => deleteUserMutation.mutate(data?._id)}
                            >
                                Taip
                            </Button>
                            <Button $inverted={true} size='14px' type={BUTTON_TYPES.button} theme={theme} onClick={handleUserDeleteCancel}>
                                Atšaukti
                            </Button>
                        </div>
                    </div>
                )}

                {isEditing && (
                    <div className='delete-alert'>
                        <div>
                            <Button
                                $inverted={true}
                                size='14px'
                                type={BUTTON_TYPES.button}
                                theme={theme}
                                onClick={() => updateUserMutation.mutate(data?._id)}
                            >
                                Išsaugoti
                            </Button>
                            <Button $inverted={true} size='14px' type={BUTTON_TYPES.button} theme={theme} onClick={handleUserUpdateCancel}>
                                Atšaukti
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </StyledListItem>
    );
};

export default ListItem;
