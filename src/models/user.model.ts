export class UserModel {    
    id_user: number;
    name_user: string;
    email_user: string;
    password: string;

    constructor() {
        this.id_user = 0;
        this.name_user = '';
        this.email_user = '';
        this.password = '';
    }
}
