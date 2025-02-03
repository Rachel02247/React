import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useContext, useRef, useState } from "react";
import { userContext } from "./userContextReducer";
import axios from "axios";
import LoginStore from "../global_state/mobx/LoginStore";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '70%',
    bgcolor: 'white',
    color: '#8E6549',
    border: '2px solid #8E6549',
    boxShadow: 24,
    p: 4,
};

const UpdateUser = () => {

    const [open, setOpen] = useState(false);
    const [user, userDispatch] = useContext(userContext);

    const url = "http://localhost:3000/api/user";

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        await axios.put(url, {
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            email: emailRef.current?.value,
            address: addressRef.current?.value,
            phone: phoneRef.current?.value
        },
            { headers: { 'user-id': LoginStore.UserId + '' } }
        );

        userDispatch({
            type: 'UPDATE',
            data: {
                firstName: firstNameRef.current?.value || '',
                lastName: lastNameRef.current?.value || '',
                email: emailRef.current?.value || '',
                address: addressRef.current?.value || '',
                phone: phoneRef.current?.value || '',
            }
        });

        if (firstNameRef.current?.value) firstNameRef.current.value = ''
        if (lastNameRef.current?.value) lastNameRef.current.value = ''
        if (emailRef.current?.value) emailRef.current.value = ''
        if (addressRef.current?.value) addressRef.current.value = ''
        if (phoneRef.current?.value) phoneRef.current.value = ''
        setOpen(false);
    }

    return <>
        <div>
            <Button sx={{ color: '#8E6549', border: '2px solid #F2E5C9' }} variant='outlined' onClick={handleOpen}>update</Button>
            <Modal
                sx={style}
                open={open}
                onClose={handleClose}
                aria-labelledby="update-form"
                aria-describedby="update-form-description"
            >
                <Box >
                    <Typography sx={{ color: '#8E6549' }} id="update-form" variant="h6" component="h2">
                        hi {user.firstName}
                    </Typography>
                    <Typography id="update-form-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <TextField label='firstName' defaultValue={user.firstName} inputRef={firstNameRef} />
                            <br /><br />
                            <TextField label='lastName' defaultValue={user.lastName} inputRef={lastNameRef} />
                            <br /><br />
                            <TextField label='email' defaultValue={user.email} inputRef={emailRef} />
                            <br /><br />
                            <TextField label='address' defaultValue={user.address} inputRef={addressRef} />
                            <br /><br />
                            <TextField label='phone' defaultValue={user.phone} inputRef={phoneRef} />
                            <br />
                            <Button sx={{ color: '#8E6549' }} color="info" fullWidth variant='text' type="submit">save change</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    </>
}

export default UpdateUser;