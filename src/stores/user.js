import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {email: "", token: "", isLoggedIn: false},
  reducers: {
    loggedIn(state,action){
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
    },
    loggedOut(state){
        state.email = "";
        state.token = "";
        state.isLoggedIn = false;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
