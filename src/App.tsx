import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import GameLobby from './pages/game-lobby';
import Prompt from './pages/prompt';
function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/game-lobby" element={<GameLobby />} />
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
    </>
  )
}

export default App
