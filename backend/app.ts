import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllUsers, addUser, deleteUser, updateUser } from './controllers/users.controller';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);

require('./config/database');

app.get('/users', getAllUsers);
app.post('/add-user', addUser);
app.delete('/delete-user/:id', deleteUser);
app.put('/update-user/:id', updateUser);

app.listen(PORT);
