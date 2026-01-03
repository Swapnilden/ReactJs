import { useState } from "react";

function Folder({ handleInsertNode, explorer }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    })

    const handleClick = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        })
    }

    const onAddFolder = (e) => {
        if(e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, showInput.isFolder, e.target.value);
            setShowInput({...showInput, visible: false});
        }
    }

    if(explorer.isFolder) { 
    return (<div style={{marginTop: 5}}>
        <div className="folder" onClick={() => setExpand(!expand)}>
            <span>📁 {explorer.name}</span>

            <div>
                <button onClick={(e) => handleClick(e, true)}>Folder +</button>
                <button onClick={(e) => handleClick(e, false)}>File +</button>
            </div>
        </div>

            <div style={{display: expand? 'block':'none', paddingLeft: 25}}>
                {showInput.visible && (
                    <div className="inputContainer">
                        <span>{showInput.isFolder? "📁" : "📄"}</span>
                        <input
                        type="text"
                        autoFocus
                        onKeyDown={onAddFolder}
                        onBlur={() => setShowInput({...showInput, visible: false})}
                        className="inputContainer__input"
                        />
                    </div>
                )}
            {explorer.items.map((exp) => {
                return <Folder 
                handleInsertNode={handleInsertNode}
                explorer={exp} 
                key={exp.id}/>;  
            })}
            </div>
    </div>
    );
    } else {
        return <span className="file">📄 {explorer.name}</span>
    }
}

export default Folder;