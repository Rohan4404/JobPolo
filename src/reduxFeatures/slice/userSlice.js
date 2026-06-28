import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  firstName: storedUser?.firstName || "",
  lastName: storedUser?.lastName || "",
  email: storedUser?.email || "",
  role: storedUser?.role || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;

      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.role = "";

      sessionStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
