import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    console.log("DATA:", data);
    setNotes(data);
  };

  return (
    <div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem note={note} key={index} />
        ))}
      </div>
    </div>
  );
};

export default NotesListPage;
