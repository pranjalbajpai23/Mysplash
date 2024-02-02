import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice=createSlice({
    name:"favorite",
    initialState:[],
    reducers:{
        addFavorite:(state,action)=>{
            return action.payload;
        }
    }
})
export const favoriteActions=favoriteSlice.actions;
export default favoriteSlice;