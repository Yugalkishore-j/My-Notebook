import React ,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { AlertContext } from '../context/notes/AlertContext';


const Noteitems = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context; 
    const { note, updateNote } = props;
    const { showAlert } = useContext(AlertContext); 
    
    const handleDelete = () => {
        deleteNote(note._id);
        showAlert('success', 'Note deleted successfully!');
    };

    const handleUpdate = () => {
        updateNote(note);
        showAlert('success', 'Note updated successfully!');
    };

    return (
        <div className="note-card ">
            
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className=" icon fa-solid fa-pen-to-square mx-2" onClick={handleUpdate}></i>
                        <i className="icon fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
         
        </div>
    )
}
export default Noteitems