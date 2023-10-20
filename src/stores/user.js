import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {email: "", token: "", unReadMails: 0, isLoggedIn: false},
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
    },
    updateUnreadMails(state,action){
      state.unReadMails = action.payload;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
