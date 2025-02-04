import { Avatar, Button, Stack } from "@mui/material"
import { UserContext } from "../userContextReducer"
import { useContext } from "react"
import UpdateUser from "./updateUser"
import { observer } from "mobx-react"
import LoginStore from "../global_state/mobx/LoginStore"



const userDetails = observer(() => {

    const [user,] = useContext(UserContext)

    const stringAvatar = (name: string) => {
        if (!name)
            name = 'JohnDoe'
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }

    const stringToColor = (string: string) => {

        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    const handleClick = () => LoginStore.LoginStatus = 'before';

    return <>

        <Stack sx={{ display: 'flex', alignItems: 'center', paddingTop: '2%' }} direction={"row"} spacing={2}>
            <Avatar style={{ marginLeft: '8px' }} {...stringAvatar(user.firstName)} >
                {(user.firstName ? user.firstName[0] : '')}
            </Avatar>
            {user.firstName && <h4>{user.firstName}</h4>}
            <UpdateUser></UpdateUser>
            <Button sx={{ color: '#8E6549', border: '2px solid #F2E5C9' }} variant="outlined" onClick={handleClick}>logout</Button>

        </Stack>
    </>
});

export default userDetails;