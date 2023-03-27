import { configureStore } from "@reduxjs/toolkit";
import { storageSlice } from "./storageSlice";
const store = configureStore({ reducer: { storage: storageSlice.reducer } });
export default store;