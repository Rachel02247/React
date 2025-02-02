import { Outlet, useLocation } from "react-router"
import NavBar from "./components/NavBar"
import UsingTypingEffect from "./components/usingTypingEffect"
import Menu from "./components/menu"


export default () => {
    const isHomePage = useLocation().pathname === '/';

    return (<>
        <Menu />
        <NavBar />
        <Outlet />
        {isHomePage &&
            <> <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
                <UsingTypingEffect />
            </>
        }
    </>)
}