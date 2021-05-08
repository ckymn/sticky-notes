import { useRef, useState, useEffect } from "react";
import "./App.css";
import MainContext from "./MainContext";
import Note from "./components/Note";
import NoteBox from "./components/NoteBox";
import LeaveCommentText from "./components/LeaveCommentText";

function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [notes, setNotes] = useState(
    (localStorage.notes && JSON.parse(localStorage.notes)) || []
  );
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [boxVisible, setBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    screen.current.focus();
    document.title = "React Sticky Not Uygulaması";
  }, []);

  // LOCAL STORAGE
  useEffect(() => {
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleKeyUp = (e) => {
    if (e.key === "c") {
      setMode(!mode);
      setBoxVisible(false);
    }
    if (e.key === "Escape") {
      setBoxVisible(false);
    }
  };

  const handleMouseMove = (e) => {
      setPosition({
        x: [e.pageX, e.clientX],
        y: [e.pageY, e.clientY],
      });
  };

  const handleClick = (e) => {
    if (mode) {
      setBoxPosition({
        x: position.x[0],
        y: position.y[0],
      });
      setBoxVisible(true);
    }
  };

  const data = {
    position,
    boxPosition,
    setMode,
    setNotes,
    setBoxVisible,
    notes,
  };

  return (
    <MainContext.Provider value={data}>
      <div
        ref={screen}
        tabIndex={0}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onKeyUp={handleKeyUp}
        className={`screen${mode ? " editable" : ""}`}
      >
        <h3 style={{ textAlign: "center" }}>Sticky Notes EveryWhere</h3>
        <img
          style={{width: "100%", height: "100%" }}
          src="https://image.freepik.com/free-photo/colorful-blank-sticky-notes-cork-board_23-2147890055.jpg"
          alt="img"
        />

        {mode && <LeaveCommentText />}

        {notes && notes.map((note, i) => <Note key={i} {...note} />)}

        {boxVisible && <NoteBox />}

      </div>
      <div className="sticky-bar">
        <button onClick={() => setMode(!mode)} className={mode ? "active" : ""}>
          Yorum Modu <code>c</code>
        </button>
        {boxVisible && (
          <button onClick={() => setBoxVisible(false)} className="active">
            Kapat <code>Esc</code>
          </button>
        )}
      </div>
    </MainContext.Provider>
  );
}

export default App;
