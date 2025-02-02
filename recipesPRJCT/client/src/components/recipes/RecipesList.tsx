import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../global_state/redux/store'
import { Box, CircularProgress, Grid, Grid2, List, ListItemButton, ListItemIcon } from '@mui/material';
import { useEffect } from 'react';
import { fetchRecipes } from '../global_state/redux/recipesSlice';
import { RecipeType } from '../types';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link, Outlet } from 'react-router';


export default () => {

    const listRecipes = useSelector((state: RootState) => state.recipes.list);
    const loadRecipes = useSelector((state: RootState) => state.recipes.loading);
    const dispatch = useDispatch<AppDispatch>();

console.log(loadRecipes);


    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch(fetchRecipes)])

    return (<>

        <div style={{ height: "100vh", overflow: "visible", padding: '2%' }}>
            <Grid container sx={{ height: "100%" }}>
                {/* רשימה בצד ימין - שליש מהעמוד */}
                <Grid item xs={4} sx={{ borderRight: "1px solid #ddd", padding: 2, height: "100%", overflowY: "auto" }}>

                    {true ? listRecipes.map((item, index) => (
                        <ListItemButton key={index}>
                            <ListItemIcon sx={{ paddingLeft: '2vw' }}>
                                <RestaurantIcon sx={{ color: "#F2E5C9" }} />
                            </ListItemIcon>
                            <Link to={`/recipes/${item.id}`} style={{ paddingLeft: '2vw', textDecoration: "none", color: "#5E4238" }}>
                                {item.title}
                            </Link>
                        </ListItemButton>
                    )) : <Box><CircularProgress color="secondary" /></Box>}

                    {/* <List sx={{paddingLeft:'10%' }}> */}
                    {/* {listRecipes.map((item, index) => (
                            <ListItemButton key={index}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <Link to={`/recipes/${item.id}`} style={{ textDecoration: "none", color: '#5E4238' }}>
                                    {item.title}
                                </Link>
                            </ListItemButton>
                        ))}
                    </List> */}
                </Grid>

                {/* תוכן ראשי - שני שליש מהעמוד */}
                <Grid item xs={8} sx={{ padding: 3, height: "100%", display: 'flex', flexDirection: 'row' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    </>)
}


