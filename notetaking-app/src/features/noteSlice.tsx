import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface Note{
    id: string;
    title: string;
    content: string;
    date: string;
}
export interface NoteState{
    notes: Note[];
    active: Note | null;
}

const initialState: NoteState = {
    notes: [{
        id: '1',
        title: 'First Note',
        content: 'This is my first note',
        date: new Date().toLocaleString(),
    }],
    active: null,
};

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers:{
        addNote:(state, action: PayloadAction<Note>) => {
            const newNote = {...action.payload, id: nanoid()};
            state.notes.push(newNote);
        },
        editNote: (state, action: PayloadAction<Note>) => {
            const { id, title, content, date } = action.payload;
            const noteToEdit = state.notes.find((note) => note.id === id);
            if (noteToEdit) {
                noteToEdit.title = title;
                noteToEdit.content = content;
                noteToEdit.date = date;
            }
            if (state.active?.id === id) {
                state.active = action.payload;
            }
        },
        
        setActiveNote :(state: NoteState, action: PayloadAction<string | null>) => {
            const activeId = action.payload;
            state.active = activeId
                ? state.notes.find((note) => note.id === activeId) || null
                : null;
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            const deletedId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== deletedId);
            if (state.active?.id === deletedId) {
                state.active = null;
            }
        },
        

    }

})

export const selectNotes = (state: NoteState) => state.notes.notes;
export const { addNote, editNote, setActiveNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
