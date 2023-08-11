import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectNotes, deleteNote } from './noteSlice';
import { Note } from './noteSlice';
import EditForm from './EditForm'; // Provide the correct path to EditForm

const NoteList: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  const handleDeleteNote = (noteId: string) => {
    dispatch(deleteNote(noteId));
  };

  const handleEditNote = (noteId: string) => {
    setEditNoteId(noteId);
  };
  const handleCancelEdit = () => {
    setEditNoteId(null);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Notes</h2>
      <ul className="list-disc pl-6">
        {notes.map((note: Note) => (
          <li key={note.id} className="mb-2">
            <strong>{note.title}</strong>
            <p className="text-gray-600">{note.content}</p>
            <p className="text-gray-400 text-xs">{note.date}</p>
            {editNoteId === note.id ? (
              <EditForm activeNote={note} oncancel={handleCancelEdit} />
            ) : (
              <>
                <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 mr-2">
                  Delete
                </button>
                <button onClick={() => handleEditNote(note.id)} className="text-blue-500">
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
