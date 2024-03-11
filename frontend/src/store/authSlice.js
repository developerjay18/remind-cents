import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { setAuth } = authSlice.actions;
