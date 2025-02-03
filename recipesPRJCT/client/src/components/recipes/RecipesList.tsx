import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../global_state/redux/store'
import { Box, Button, CircularProgress, Grid, ListItemButton, ListItemIcon } from '@mui/material';
import { useEffect } from 'react';
import { deleteRecipe, fetchRecipes } from '../global_state/redux/recipesSlice';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link, Outlet } from 'react-router';
import { Delete } from "@mui/icons-material";
import { RecipeType } from '../types';

export default () => {

    const { list: listRecipes, loading: loadRecipes } = useSelector((state: RootState) => state.recipes);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch])

    const handleDelete = async (item: RecipeType) => {
        await dispatch(deleteRecipe({ recipeId: item.id, userId: item.authorId }));
        await dispatch(fetchRecipes());
    }

    return (<>

        <div style={{ height: "100vh", overflow: "visible", padding: '2%' }}>
            <Grid container sx={{ height: "100%" }}>
                <Grid item xs={4} sx={{ borderRight: "1px solid #ddd", padding: 2, height: "100%", overflowY: "auto" }}>

                    {!loadRecipes ? listRecipes.map((item, index) => (
                        <ListItemButton key={index}>
                            <Button sx={{ color: '#5E4238' }} onClick={() => handleDelete(item)}><Delete /></Button>
                            <ListItemIcon sx={{ paddingLeft: '2vw' }}>
                                <RestaurantIcon sx={{ color: "#F2E5C9" }} />
                            </ListItemIcon>
                            <Link to={`/recipes/${item.id}`} style={{ paddingLeft: '2vw', textDecoration: "none", color: "#5E4238" }}>
                                {item.title}
                            </Link>
                        </ListItemButton>
                    )) : <Box sx={{ paddingLeft: '3%', paddingTop: '10%', fontSize: '20px', fontWeight: 'bold' }}><CircularProgress sx={{ color: '#5E4238' }} color="inherit" /> loading...</Box>}

                </Grid>

                <Grid item xs={8} sx={{ padding: 3, height: "100%", display: 'flex', flexDirection: 'row' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    </>)
}


