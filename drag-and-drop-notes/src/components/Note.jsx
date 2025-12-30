import { forwardRef } from "react";

const Note = forwardRef(({content, initialPosition, ...props}, ref) => { // since ref is passed to whole component Note in its parent component Notes
    return (
        <div
        ref={ref}
        style={{
            position: "absolute",
            top: `${initialPosition?.y}px`,
            left: `${initialPosition?.x}px`,
            padding: "10px",
            width: "200px",
            userSelect: "none",
            backgroundColor: "lightyellow",
            border: "1px solid black",
            cursor: "move"
        }}
        {...props}
        >
            📌 {content}
        </div>
    )
})

export default Note;