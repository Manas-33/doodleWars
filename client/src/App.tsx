import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import GameLobby from './pages/Lobby';
import Prompt from './pages/prompt';
import AnimationTool from './pages/draw';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<GameLobby />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/draw" element={<AnimationTool />} />
      </Routes>
    </>
  )
}

export default App
