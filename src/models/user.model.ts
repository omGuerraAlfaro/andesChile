export class UserModel {    
    id_user: number;
    username: string;
    correo_electronico: string;
    password: string;

    constructor() {
        this.id_user = 0;
        this.username = '';
        this.correo_electronico = '';
        this.password = '';
    }
}
