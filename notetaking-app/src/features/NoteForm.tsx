import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, editNote, setActiveNote } from './noteSlice'; 
import { Note } from './noteSlice';

interface NoteFormProps {
  editMode?: boolean;
  noteToEdit?: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({ editMode = false, noteToEdit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editMode ? noteToEdit?.title || '' : '');
  const [content, setContent] = useState(editMode ? noteToEdit?.content || '' : '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && content) {
      if (editMode && noteToEdit) {
        dispatch(editNote({
          id: noteToEdit.id,
          title,
          content,
          date: new Date().toLocaleString(),
        }));
        dispatch(setActiveNote(null)); 
      } else {
        dispatch(addNote({
          id: '', 
          title,
          content,
          date: new Date().toLocaleString(),
        }));
      }
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">{editMode ? 'Edit Note' : 'Add Note'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {editMode ? 'Save Changes' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
