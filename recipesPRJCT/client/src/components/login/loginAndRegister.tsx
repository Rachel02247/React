import { createContext, FormEvent, useContext, useRef, useState } from "react";
import { userContext } from "./userContextReducer";
import axios from "axios";
import UserNameAndAvatr from "./userNameAndAvatr";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { observer } from "mobx-react";
import LoginStore from "../global_state/mobx/LoginStore";

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #8E6549',
    bgcolor: 'background.paper',
    color: '#8E6549',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    
};

export const UserIdContext = createContext<number>(-1);

export default observer(({ signInOrUp }: { signInOrUp: string }) => {

    const [openModal, setOpenModal] = useState(true);
    const [userID, ] = useState<number>(-1);
    const [, userDispatch] = useContext(userContext);

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const url = 'http://localhost:3000/api/user';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(url + '/' + signInOrUp,
                {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                },)

            if (signInOrUp === "login")
                LoginStore.userId = res.data.user.id;
            else
                LoginStore.userId = res.data.userId;

            userDispatch({
                type: "CREATE",
                data: {
                    password: passwordRef.current?.value || '',
                    email: emailRef.current?.value || '',
                    firstName: signInOrUp == 'login' ? res.data.user.firstName : '',
                    lastName: signInOrUp == 'login' ? res.data.user.lastName : '',
                    address: signInOrUp == 'login' ? res.data.user.address : '',
                    phone: signInOrUp == 'login' ? res.data.user.phone : '',
                },
            });
            setOpenModal(!openModal);

            LoginStore.LoginStatus = "after";

        } catch (e: any) {
            
            if (e.status === 422 || signInOrUp === 'register')
                alert('user is already sign up');

            else if (e.status === 401 || signInOrUp === 'login')
                alert("user is not register");

            LoginStore.loginStatus = "before";
        }
        finally {
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
        }
    }

    return (<>

        <Modal open={openModal} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{signInOrUp === 'login' ? "sign in" : "sign up"}</Typography>
                    <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                    <TextField label='userPassword' variant="filled" margin="normal" type='password' fullWidth inputRef={passwordRef} required />
                    <Button sx={{ marginTop: '2px', color: '#8E6549' }} fullWidth variant="text" type="submit">{signInOrUp == 'login' ? 'login' : 'register'}</Button>
                </form>
            </Box>
        </Modal>

        <UserIdContext.Provider value={userID}>
            {!openModal && <UserNameAndAvatr/> }
        </UserIdContext.Provider>
    </>)
});


