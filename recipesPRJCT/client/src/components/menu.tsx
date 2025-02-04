import { Toolbar } from "@mui/material"
import { UserContextReducer } from "./userContextReducer"


export default () => {


    return (<>

        <Toolbar sx={{justifyContent: "space-between", paddingRight: '20px', flexDirection: 'row-reverse' }}>
            <UserContextReducer />
        </Toolbar>
    </>)
}