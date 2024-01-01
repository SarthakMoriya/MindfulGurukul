import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;   
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.secretkey = null;
    },
  },
});

export const recordsSlice = createSlice({
  name: "records",
  initialState: { records: [] },
  reducers: {
    setRecords: (state, action) => {
      state.records = action?.payload?.records;
      // console.log(action.payload.records);
    },
    setNewRecords: (state, action) => {
      state.records = [...state.records, action.payload.record];
      console.log("NEW RECORDS" + state.records);
    },
  },
});

//Functions to use in Application to handle auth
export const { setLogin, setLogout } = authSlice.actions;
export const { setRecords, setNewRecords } = recordsSlice.actions;

export const authReducers = authSlice.reducer;
export const recordReducers = recordsSlice.reducer;