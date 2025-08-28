const Note = ({ note, toggleImportance }) => {
  const label = note.importance ? "make not importance" : "make importance";
  return (
    <div>
      <li>{note.content}</li>;
      <button onClick={toggleImportance}>{label}</button>;
    </div>
  );
};

export default Note;
