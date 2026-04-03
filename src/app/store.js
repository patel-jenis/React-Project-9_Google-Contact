import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contact/contactSlice"

const store = configureStore({
    reducer: {
        contactReducer,
    },
})

export default store;