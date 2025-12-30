import { createContext, createRef, useEffect, useRef } from "react";
import Note from "./Note";

const Notes = ({notes = [], setNotes = () => {}}) => {

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

        const updatedNotes = notes.map((note) => {
            const savedNote = savedNotes.find(n => n.id === note.id);
            if(savedNote){
                return {...note, position: savedNote.position};
            } else {
                const position = determinePosition();
                return {...note, position} // in JavaScript, this: return { ...note, position }; is shorthand for: return { ...note, position: position };
            }
        })

        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }, [notes.length])

    const noteRefs = useRef([]);

    const handleDragStart = (e, note) => {
        const { id } = note; 
        const noteRef = noteRefs.current[id].current;
        const rect = noteRef.getBoundingClientRect();
        const offsetX = e.clientX - rect.left; // // e.clientX = exact horizontal position of your mouse on the screen and offsetX = How far from the LEFT edge of the note did the user click?
        const offsetY = e.clientY - rect.top;

        const startPos = note.position;

        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;  // keeps cursor FIXED inside note while dragging
            const newY = e.clientY - offsetY;

            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`
        }

        const handlleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handlleMouseUp);

            const finalRect = noteRef.getBoundingClientRect();
            const newPosition = {x: finalRect.left, y: finalRect.top};

            if(checkForOverlap(id)){
                noteRef.style.left = `${startPos.x}px`;
                noteRef.style.top = `${startPos.y}px`
            } else {
                updateNotePosition(id, newPosition);
            }
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handlleMouseUp)
    }

    const checkForOverlap = (id) => {
        const currentNoteRef = noteRefs.current[id].current;
        const currentRect = currentNoteRef.getBoundingClientRect();

        return notes.some((note) => {
            if(note.id === id) return false;

            const otherNoteRef = noteRefs.current[note.id].current;
            const otherRect = otherNoteRef.getBoundingClientRect();

            const overlap = !(
                currentRect.right < otherRect.left ||
                otherRect.right < currentRect.left ||
                currentRect.bottom < otherRect.top ||
                otherRect.bottom < currentRect.top
            )

            return overlap;
        })
    }

    const updateNotePosition = (id, newPosition) => {
        const updatedNotes = notes.map((note) => note.id === id ? {...note, position: newPosition} : note)
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }

    const determinePosition = () => {
        const maxX = window.innerWidth - 250;
        const maxY = window.innerHeight - 250;

        return {
            x: Math.floor(Math.random()*maxX),
            y: Math.floor(Math.random()*maxY)
        }
    }

    return (
        <div>
            {
                notes.map((note) => {
                    return <Note key={note.id}
                        ref={noteRefs.current[note.id]?
                            noteRefs.current[note.id]
                            : (noteRefs.current[note.id] = createRef())
                        }
                        content={note.text} 
                        initialPosition={note.position}
                        onMouseDown={(e) => handleDragStart(e, note)}
                    />
                })
            }
        </div>
    )
}

export default Notes;