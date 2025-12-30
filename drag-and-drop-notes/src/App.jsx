import { useState } from 'react'
import './App.css'
import Notes from './components/Notes'

function App() {
  const [notes, setNotes] = useState(
    [
    {
      id: 1,
      text: "Check the description for my Frontend Interview Prep Course"
    },
    {
      id: 2,
      text: "Like this Video and Subscribe to Roadside Coder"
    }
  ]
  )
  return (
    <>
      <Notes notes={notes} setNotes={setNotes}/>
    </>
  )
}

export default App
