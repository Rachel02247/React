import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const IsFormOpen = createSlice({
    name: 'isFormOpen',
    initialState: {isOpen: true},
    reducers: {
        setIsOpen(state, action:PayloadAction<boolean>)  {
            state.isOpen = action.payload; 
        }
    }
});

export const selectAddRecipes = (state: boolean) => state;

export const {setIsOpen} = IsFormOpen.actions;
export default IsFormOpen;