import { useState } from 'react'
import './App.css'
import explorer from "./data/folderData.js";
import Folder from './components/folder.jsx';
import useTraverseTree from './hooks/use-traverse-tree.jsx';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const {insertNode} = useTraverseTree();

  const handleInsertNode = (folderID, isFolder, item) => {
    const finalTree = insertNode(explorerData, item, isFolder, folderID);

    setExplorerData(finalTree);
  }

  return (
    <div className='App'>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData}/>
    </div>
  )
}

export default App;
