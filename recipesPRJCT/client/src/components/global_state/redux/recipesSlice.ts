import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RecipeType } from "../../types"
import { RootState } from "./store";
import LoginStore from "../mobx/LoginStore";

const url = "http://localhost:3000/api/recipes";

export const fetchRecipes = createAsyncThunk('recipes/fetch', async (_, thunkApi) => {
    try {
        const response = await axios.get(url);
        return response.data as RecipeType[];
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const addRecipes = createAsyncThunk('recipes/add', async (recipe: RecipeType, thunkApi) => {
    try {
        console.log(recipe);
        
        const res = await axios.post("http://localhost:3000/api/recipes",
           recipe,
           { headers: { 'user-id': LoginStore.UserId + '' } 
        });
        return res.data as RecipeType[];
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        list: [] as RecipeType[],
        loading: true,
        error: null as null | string

    },

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true,//<CircularProgress color="secondary" />
                state.error = null
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<RecipeType[]>) => {
                state.loading = false,
                state.error = null,
                state.list = action.payload
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false,
                state.error = action.error.message || "failed loading data"
            })
            .addCase(addRecipes.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(addRecipes.fulfilled, (state, action: PayloadAction<RecipeType[]>) => {
                state.loading = false,
                state.error = null,
                state.list = action.payload
            })
            .addCase(addRecipes.rejected, (state, action) => {
                state.loading = false,
                state.error = action.error.message || "failed adding recipe"
            })
    }       
});

export const selectRecipes = (state: RootState) => state.recipes;
export const {actions} = recipesSlice;
export default recipesSlice
