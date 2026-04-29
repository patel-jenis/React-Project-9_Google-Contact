import { createSlice } from "@reduxjs/toolkit";
import SEED from "../../utils/seed";

const initialState = {
    contacts: JSON.parse(localStorage.getItem("contacts")) || SEED,
    trash: JSON.parse(localStorage.getItem("trash")) || [],
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
        },
        deleteContact: (state, action) => {
            const id = action.payload;

            const contactToDelete = state.contacts.find(c => c && c.id === id);

            if (!contactToDelete) return;

            state.contacts = state.contacts.filter(c => c && c.id !== id);
            state.trash.push(contactToDelete);

            localStorage.setItem("contacts", JSON.stringify(state.contacts));
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        restoreContact: (state, action) => {
            const id = action.payload;

            const contactToRestore = state.trash.find(c => c && c.id === id);

            if (!contactToRestore) return;

            state.trash = state.trash.filter(c => c && c.id !== id);
            state.contacts.push(contactToRestore);

            localStorage.setItem("contacts", JSON.stringify(state.contacts));
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        permanentlyDelete: (state, action) => {
            const id = action.payload;

            state.trash = state.trash.filter(c => c && c.id !== id);

            localStorage.setItem("trash", JSON.stringify(state.trash));
        }
    }
})

export const { addContact, getContact, editContact, deleteContact, restoreContact, permanentlyDelete } = contactSlice.actions;
export default contactSlice.reducer;