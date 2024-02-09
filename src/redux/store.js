import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./redusers/reducer";

const store = configureStore({ reducer: reducer });

export default store;
