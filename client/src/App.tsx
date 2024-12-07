import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import GameLobby from './pages/Lobby';
import Prompt from './pages/prompt';
import AnimationTool from './pages/draw';
import VoteGrid from './pages/Voting';
import ResultsPage from './pages/Results';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<GameLobby />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/draw" element={<AnimationTool />} />
        <Route path="/vote" element={<VoteGrid />} />
        <Route path="/standings" element={<ResultsPage />} />
      </Routes>
    </>
  )
}

export default App
