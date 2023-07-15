import { User } from '../modules/user.module';

interface IUpdateData {
    name?: string;
    surname?: string;
    email?: string;
    age?: string;
}

export const getAllUsers = async (req: any, res: any) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        res.status(400).json({ message: 'Klaida!' });
    }
};

export const addUser = async (req: any, res: any) => {
    const userData = req.body.data;
    try {
        const user = new User(userData);
        const savedUser = await user.save();

        res.status(201).json({ message: 'Vartotojas  pridėtas sėkmingai.', savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Įvyko klaida.', error: true });
    }
};

export const updateUser = async (req: any, res: any) => {
    const userID = req.params.id;
    const data = req.body.data;
    const { name, surname, email, age } = data;

    const dataToUpdate: IUpdateData = {};

    if (name) dataToUpdate.name = name;
    if (surname) dataToUpdate.surname = surname;
    if (email) dataToUpdate.email = email;
    if (age) dataToUpdate.age = age;

    try {
        const updatedData = await User.findByIdAndUpdate(userID, dataToUpdate);
        res.status(201).json({ message: 'Vartotojas atnaujintas.', updatedData });
    } catch (error) {
        res.status(404).json({ message: 'Vartotojo su tokiu ID nėra.' });
    }
};

export const deleteUser = async (req: any, res: any) => {
    const userID = req.params.id;

    try {
        await User.findByIdAndDelete(userID);
        res.status(201).json({ message: 'Vartotojas ištrintas.' });
    } catch (error) {
        res.status(404).json({ message: 'Vartotojo su tokiu ID nėra.' });
    }
};
