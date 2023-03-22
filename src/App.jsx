import { useState } from 'react'
import './App.css'
import DragDropView from './Views/DragDropView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <DragDropView/>
    </div>
  )
}

export default App
