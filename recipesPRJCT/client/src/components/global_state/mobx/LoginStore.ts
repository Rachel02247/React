import {makeAutoObservable} from 'mobx'
import { loginStatus } from '../../types';

class LoginStore{
    
    loginStatus: loginStatus = "before"
    userId!: number;

    constructor() {
        makeAutoObservable(this);
    }

    get LoginStatus(){
        return this.loginStatus;
    } 

    set LoginStatus(status: loginStatus){
        this.loginStatus = status
    }

    get UserId(){
        return this.userId;
    }

    set UserId(id: number){
        this.userId = id;
    }
}

export default new LoginStore();