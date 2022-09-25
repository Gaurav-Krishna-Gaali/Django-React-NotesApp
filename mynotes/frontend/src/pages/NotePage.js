import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Arrowleft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id: noteId } = useParams();
  const history = useNavigate();

  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId === "new ") return;

    let response = await fetch(`/api/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    fetch(`/api/notes/${noteId}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let createeNote = async () => {
    fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    history("/");
  };

  let handleSubmit = () => {
    console.log("SUBMITTING", noteId);
    if (noteId === "new " && !note.body) {
      deleteNote();
      console.log("delte", noteId);
    } else if (noteId === "new " && note.body !== "") {
      createeNote();
      console.log("create", noteId);
    } else if (noteId !== "new ") {
      updateNote();
      console.log("update", noteId);
    }
    // updateNote() && console.log("submitted");

    history("/");
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${noteId}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    history("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Arrowleft onClick={handleSubmit} />
        </h3>
        {console.log(noteId)}
        {noteId !== "new " ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
