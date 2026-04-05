import { createSlice } from "@reduxjs/toolkit";
import SEED from "../../utils/seed";

const initialState = {
    contacts: JSON.parse(localStorage.getItem("contacts")) || SEED,
    contact: { first: '', last: '', email: '', phone: '', company: '', label: 'Mobile' }
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
            localStorage.setItem("contacts", JSON.stringify(state.contacts));
        },
        getContact: (state, action) => {
            state.contact = state.contacts.find(
                c => c.id === parseInt(action.payload)
            );
        },
        editContact: (state, action) => {
            const updated = action.payload;

            state.contacts = state.contacts.map(c =>
                c.id === updated.id ? { ...c, ...updated } : c
            );

            localStorage.setItem("contacts", JSON.stringify(state.contacts));
        }
    }
})

export const { addContact, getContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;