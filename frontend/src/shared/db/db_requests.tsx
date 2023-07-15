import axios, { AxiosResponse, AxiosError } from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
});

httpClient.interceptors.response.use(
    (response) => response.data as AxiosResponse,
    (error) => error as IResponseError
);

export interface IUserKeys {
    [key: string]: string | number | undefined;
    name: string;
    surname: string;
    email: string;
    age?: number | string;
    _id?: string;
    message?: string;
}

export interface IUpdatedUserResponse {
    message: string;
    updatedData?: IUserKeys;
    response?: IResponseData;
}

export interface IAddedUserResponse {
    message: string;
    savedUser?: IUserKeys;
    response?: IResponseData;
}

export interface IResponseData {
    data: {
        [key: string]: string;
    };
}

export interface IResponseError {
    code: string;
    message: string;
    name: string;
}

class DB_REQUESTS {
    private ALL_USERS: string;
    private ADD_USER: string;
    private DELETE_USER: string;
    private UPDATE_USER: string;

    constructor() {
        this.ALL_USERS = '/users';
        this.ADD_USER = '/add-user';
        this.UPDATE_USER = '/update-user/';
        this.DELETE_USER = '/delete-user/';
    }

    public async getAllUsers() {
        return await httpClient
            .get(this.ALL_USERS)
            .then((data) => data)
            .catch((error: AxiosError) => error);
    }

    public async addUser(data: IUserKeys) {
        return await httpClient
            .post(this.ADD_USER, {
                headers: {
                    'content-type': 'application/json',
                },
                data,
            })
            .then((data) => data)
            .catch((error: AxiosError) => error);
    }

    public async updateUser(id: string, data: IUserKeys) {
        return await httpClient
            .put(`${this.UPDATE_USER}${id}`, {
                headers: {
                    'content-type': 'application/json',
                },
                data,
            })
            .then((data) => data)
            .catch((error: AxiosError) => error);
    }

    public async deleteUser(id: string) {
        return await httpClient
            .delete(`${this.DELETE_USER}${id}`)
            .then((data) => data)
            .catch((error: AxiosError) => error);
    }
}

export default new DB_REQUESTS();
