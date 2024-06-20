export interface ILoginResponse {
    user: IUser;
    token: string;
}

export interface IUser {
    id: number;
    username: string;
    correo_electronico: string;
    rut: string;
    apoderado_id?: number;  
    profesor_id?: number; 
}
