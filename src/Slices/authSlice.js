import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    role: null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log("login reducer",action.payload)
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
            // return ;
        },
        logout:(state,action)=>{
            state.user = null;
            state.token = null;
            state.role = null;
            console.log("logout reducer");
        }
        
    }
})

export const {login,logout} = authSlice.actions;    
export default authSlice.reducer;