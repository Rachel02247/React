import { createContext, Dispatch, useReducer } from "react"
import LoginAndRegisterBtn from "./login/loginBtn";
import { User } from "./types";

type partUser = Partial<User>;

type action = {
    type: 'DELETE' | 'CREATE' | 'UPDATE',
    data: partUser
}

const userReducer = (state: User, action: action): User => {
    switch (action.type) {
        case 'CREATE':
            return { ...state, ...action.data }
        case 'UPDATE':
            return { ...state, ...action.data }
        default:
            return state
    }
}

export const UserContext = createContext<[User, Dispatch<action>]>([{} as User, () => { }]);

export const UserContextReducer = () => {

    const [user, usersDispatch] = useReducer(userReducer, {} as User);

    return (<>
        <UserContext value={[user, usersDispatch]}>
            <LoginAndRegisterBtn />
        </UserContext>

    </>);
};