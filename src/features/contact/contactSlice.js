import { createSlice } from "@reduxjs/toolkit";
import SEED from "../../utils/seed";

const initialState = {
  contacts: SEED,
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        }
    }
}) 

export const { addContact } = contactSlice.actions;
export default contactSlice.reducer;