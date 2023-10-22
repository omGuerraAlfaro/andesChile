export interface ILoginResponse {
    user: IUser;
    token: string;
}

export interface IUser {
    id: number;
    username: string;
    correo_electronico: string;
    rut: string;
    apoderado_id?: number;  // Asumo que puede ser opcional
    profesor_id?: number;  // Asumo que puede ser opcional
}
