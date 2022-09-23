import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Arrowleft } from "../assets/arrow-left.svg";

const NotePage = ({ match }) => {
  let { id: noteId } = useParams();
  const history = useNavigate();

  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
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

  let handleSubmit = () => {
    updateNote();
    history("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Arrowleft onClick={handleSubmit} />
        </h3>
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
