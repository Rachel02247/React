import { Outlet, useLocation } from "react-router"
import NavBar from "./components/NavBar"
import UsingTypingEffect from "./components/usingTypingEffect"
import Menu from "./components/menu"
import { Box } from "@mui/material"


export default () => {
    const isHomePage = useLocation().pathname === '/';

    return (<>
        <Menu />
        <NavBar />
        <Outlet />
        {isHomePage &&
            <Box paddingLeft={'0%'}> 
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
            </Box>
        }
    </>)
}