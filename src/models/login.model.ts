import { TokenModel } from "./token.model";
import { UserModel } from "./user.model";

export class LoginModel {
    user: UserModel;
    token: TokenModel;

    constructor() {
        this.user = new UserModel();
        this.token = new TokenModel();
    }
}
