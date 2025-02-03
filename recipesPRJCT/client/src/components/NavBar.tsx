import { Link } from "react-router"
import isLoggedstore from "./global_state/mobx/LoginStore"
import { observer } from "mobx-react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./global_state/redux/store"
import { setIsOpen } from "./global_state/redux/addRecipeSlice"

export default observer(() => {

    const dispatch = useDispatch<AppDispatch>();

    return (<>

        <nav style={{
            position: "absolute",
            top: "25px",
            left: "5%",
            width: '30%',
            display: "flex",
            justifyContent: 'space-around',
            textAlign: 'center',
            justifyItems: 'center',
            gap: '10px',
            fontSize: '20px',
            padding: "8px",
        }}>

            <Link to='/'><img style={{ width: '40px', borderRadius: '50%', paddingBottom: '10px' }} src="../../img/logo.png" alt="logo" /></Link>
            <Link style={{ color: '#8E6549' }} to='/home'>Home</Link>
            <Link style={{ color: '#8E6549' }} to='/about'>About</Link>
            <Link style={{ color: '#8E6549' }} to='/recipes'>Recipes</Link>
            {isLoggedstore.loginStatus === 'after' && <Link onClick={() => dispatch(setIsOpen(true))} style={{ color: '#8E6549' }} to="/addRecipe">Add-Recipe</Link>}
        </nav>
    </>)
})
