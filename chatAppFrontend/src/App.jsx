import { useState } from 'react'
import './App.css'
import JoinCreatRoom from './component/JoinCreatRoom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <JoinCreatRoom/>
    </>
  )
}

export default App
