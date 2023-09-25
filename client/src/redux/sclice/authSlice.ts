import { createSlice } from "@reduxjs/toolkit";
interface IUser {
  _id?: string;
  fullName?: string;
  email?: string;
  mobileNo?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IInitialState {
  isAuthorized: boolean;
  user: IUser | null;
  token: string;
}

const initialState: IInitialState = {
  isAuthorized: false,
  user: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (!user) {
        state.isAuthorized = false;
      } else {
        state.isAuthorized = true;
      }
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { setAuth, setToken } = authSlice.actions;
export default authSlice.reducer;
