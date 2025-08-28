import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    // console.log("effect");
    // axios.get("http://localhost:3001/notes").then((response) => {
    //   console.log("promise fulfilled");
    //   setNotes(response.data);
    // });
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    //   console.log(response.data);
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");
    // });
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => {
      n.id === id;
    });
    const changedNote = { ...note, important: !note.important };
    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id === id ? response.data : note)));
    // });
    noteService.update((id, changedNote) => {
      setNotes(
        notes.map((returnedNote) => (note.id === id ? returnedNote.data : note))
      );
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => {
        note.important;
      });
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              toggleImportanceOf(note.id);
            }}
          />
        ))}
        <div>
          <button
            onClick={() => {
              setShowAll(!showAll);
            }}
          >
            show {showAll ? "important" : "all"}
          </button>
        </div>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
