import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./recipesSlice";
import IsFormOpen, {  } from "./addRecipeSlice";

const store = configureStore({
    reducer: combineSlices(recipesSlice, IsFormOpen)  
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;