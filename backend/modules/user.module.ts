import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface IUser {
    name: string;
    surname: string;
    email: string;
    age: number;
    timestamps: boolean;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
