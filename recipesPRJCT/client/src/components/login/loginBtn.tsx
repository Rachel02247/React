import { Box, Button } from "@mui/material";
import { useState } from "react";
import LoginAndRegister from "./loginApi";
import { observer } from "mobx-react";
import { statusButton } from "../types";
import LoginStore from "../global_state/mobx/LoginStore";

const LoginBtn = observer(() => {

    const [signInOrUp, setSignInOrUp] = useState<statusButton | null>(null);

    const HandleClick = (signInUp: statusButton) => {
        setSignInOrUp(signInUp);

        LoginStore.LoginStatus = "in";
    }

    return (<>

        {LoginStore.LoginStatus === 'before' ? <Box sx={{ display: "flex", justifyContent: 'space-between', width: '15%', marginRight: '8%', marginTop: '2%' }}>
            <Button sx={{ boxShadow: '0', color: '#8E6549', border: '2px solid #F2E5C9' }} variant="outlined" onClick={() => HandleClick('login')}>sign in</Button>
            <Button sx={{ color: '#8E6549', border: '2px solid #F2E5C9' }} variant="outlined" onClick={() => HandleClick('register')}>sign up</Button>
        </Box>
            :
            <LoginAndRegister signInOrUp={signInOrUp!} />
        }
    </>)
});
export default LoginBtn;