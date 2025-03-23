import NoteContext from './noteContext';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  const navigate = useNavigate();

  //GET ALL NOTES
  const getNotes = async () => {
  //API CALL 
  const token = localStorage.getItem("token");
  if (!token) {
      console.error("No token found");
      return;
  }
  try {  
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    if (response.status === 401) {
      console.error("Unauthorized access - logging out");
      localStorage.removeItem("token");
      navigate('/login');  // Redirect user to login
      return;
  }

  const json = await response.json();
  console.log("Fetched Notes:", json);

  if (Array.isArray(json)) {
      setNotes(json);
  } else {
      console.error("Unexpected API response:", json);
      setNotes([]); // Avoid breaking .map()
  }
} catch (error) {
  console.error("Error fetching notes:", error);
}
  }

  //ADD NOTES
  const addNote = async (title, description, tag) => {
  //API CALL     
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
  
    if (!response.ok) {
      console.error("Error adding note:", note);
      return;
    }
    setNotes(notes.concat(note));
  };

  //DELETE NOTE
  const deleteNote = async (id) => {
  //API CAll
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json()
    console.log(json)

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //EDIT Notes 
  const editNote = async (id, title, description, tag) => {
  // API CAll 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });


    let newNotes = JSON.parse(JSON.stringify(notes))
    //Edit noteş by client 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState;
