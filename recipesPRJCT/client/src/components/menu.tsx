import { AppBar, Box, Toolbar } from "@mui/material"
import NavBar from "./NavBar"
import { UserContextReducer } from "./login/userContextReducer"
import { router } from "../router"
import { RouterProvider } from "react-router"
import { Provider } from "mobx-react"
import store from "./global_state/redux/store"


export default () => {


    return (<>

        <Toolbar sx={{justifyContent: "space-between", paddingRight: '20px', flexDirection: 'row-reverse' }}>
            <UserContextReducer />
        </Toolbar>
    </>)
}