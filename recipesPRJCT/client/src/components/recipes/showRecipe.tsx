import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { RecipeType } from "../types";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../global_state/redux/store";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckIcon from '@mui/icons-material/Check';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

export default () => {

    const { list: listRecipes, loading: loadRecipes } = useSelector((state: RootState) => state.recipes);

    const { id } = useParams();
    let recipe: RecipeType | undefined;
    if (id)
        recipe = listRecipes.find(r => r.id === parseInt(id));

    return (<>
        {loadRecipes ?
            <Box
                sx={{ paddingLeft: '3%', paddingTop: '10%', fontSize: '20px', fontWeight: 'bold' }}>
                <CircularProgress sx={{ color: '#5E4238' }} color="inherit" />
            </Box>
            :
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            padding: 0,
                            margin: 2,
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            boxShadow: 3,
                            opacity: 0.6
                        }}>

                        <Paper elevation={3} sx={{ padding: 2, color: '#5E4238' }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                <strong><RestaurantIcon fontSize="large" /> {recipe!.title} </strong>
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                <strong>{recipe!.description}</strong>
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                <strong style={{ fontSize: '20px' }}>Ingredients:</strong>
                            </Typography>

                            <div>
                                {Array.isArray(recipe!.ingredients) ? recipe!.ingredients.map((ingredient, index) => (
                                    <Typography key={index} variant="body2">
                                        <CheckIcon fontSize="small" />
                                        {ingredient}</Typography>
                                )) : recipe!.ingredients}
                            </div>

                            <Typography variant="body1" gutterBottom>
                                <br />
                                <strong style={{ fontSize: '20px' }}>Instructions:</strong>
                                <br />
                                {recipe!.instructions}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                <EmojiFoodBeverageIcon fontSize="medium" />
                                <Typography variant="h6" sx={{ marginLeft: 1 }}> Bon Appetite! 😋😊</Typography>
                            </Box>

                        </Paper>
                    </Box>
                </Grid>
            </Grid>}
    </>)
}