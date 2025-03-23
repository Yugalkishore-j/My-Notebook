import React ,{  useContext, useState } from "react";
import noteContext from '../context/notes/noteContext';
import { AlertContext } from '../context/notes/AlertContext';

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    const { showAlert } = useContext(AlertContext);
    const [note, setNote] = useState({title: "", description: "", tag: "default"});

    const handleClick =(e)=>{
        e.preventDefault()
        if (note.title.trim() === "" || note.description.trim() === "") {
          showAlert('warning', 'Title and Description cannot be empty!');
          return;

      }
      if (note.title.trim().length < 3) {
        showAlert('warning', 'Title must be at least 3 characters long!');
        return;
    }
      if (note.description.trim().length < 5) {
        showAlert('warning', 'Description must be at least 5 characters long!');
        return;
    }
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "default" });
        showAlert('success', 'Add Note successful!');
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

  return (
    <div >
        <h2 className=" addnote-h2 mx-1 text-center ">Add Notes</h2>
        <form>
        <div className="note-box">
            <div className="mb-3">
              <label htmlFor="title" className="form-label mx-3">Title</label>
              <input type="text" id="title" name="title" className="form-control" value={note.title} placeholder="your title" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label mx-3">Description</label>
              <input type="text" id="description" name="description" className="form-control"  value={note.description} placeholder="your description" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary my-2 mx-3" onClick={handleClick} >Add Note</button>
            </div>
        </form>

      </div>
  )
}

export default AddNote
