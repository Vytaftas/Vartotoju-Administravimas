import { IUserKeys } from '../db/db_requests';

export const validateInputs = (data: IUserKeys) => {
    const { name, surname, email, age } = data;

    if (name === '' && name.trim().length <= 0) return false;
    if (surname === '' || surname.trim().length <= 0) return false;
    if (email === '' || email.trim().length <= 0 || !email?.includes('@')) return false;
    if ((age && (age as number) <= 0) || (age && isNaN(age as number))) return false;

    return true;
};
