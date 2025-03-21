import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';
import AddNote from './AddNote';
import { AlertContext } from '../context/notes/AlertContext';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('token')) {  
        getNotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [navigate])

  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default"});
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  const updateNote = (currentNote) => {
    modalRef.current.click()
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description , etag: currentNote.tag})

  }
  const handleClick =(e)=>{
    console.log("Updating note..", note)
    editNote(note.id, note.etitle, note.edescription, note.etag )
    closeRef.current.click()
    showAlert('success', 'Note Updated successful!');
    
  }

  const onChange=(e)=>{
      setNote({...note, [e.target.name]:e.target.value})
  }

  return (
    <>
      <AddNote />
      <button type="button" ref={modalRef} className="btn btn-primary" style={{display:"none"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
        
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" >
        <div className="modal-dialog">
          <div className="modal-content update-container">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" id="etitle" name="etitle" className="form-control" value={note.etitle} placeholder="your title" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" id="edescription" name="edescription" className="form-control" value={note.edescription} placeholder="your description" onChange={onChange} />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" S-notes row my-3" >
        <div className="conatiner  mx-1  text-danger fs-4 " >
        {notes.length === 0 && '!! No Notes !!'}
        </div>
        {notes.map((note) => {
          return <Noteitems key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
