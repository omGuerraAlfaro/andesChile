export interface IUser {
    id_user: number;
    username: string;
    correo_electronico: string;
    password: string; 
}


export interface ILoginResponse {
    token: string;
    user: IUser;
}
