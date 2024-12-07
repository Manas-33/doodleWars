import { ethers } from 'ethers';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import Header from "@/components/Header";
import abi from '../abi/EthindiaContract.json';

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [players, setPlayers] = useState("2");
  const [gameCode, setGameCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Player options for the dropdown
  const playerOptions = ["2", "3", "4", "5", "6"];

  // Function to create a new room
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname) return setError("Nickname is required!");

    socket.emit("createRoom", { nickname, maxPlayers: players }, (response) => {
      if (response.success) {
        console.log(`Room created successfully: ${response.roomId}`);
        localStorage.setItem("roomId", response.roomId)
        navigate("/lobby", { state: { lobbyID: response.roomId, nickname } });
      } else {
        setError(response.message);
      }
    });
  };

  // Function to join a room
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameCode || !nickname)
      return setError("Both Game Code and Nickname are required!");
    console.log("join room data :", gameCode)
    console.log("join room data :", nickname)
    socket.emit("joinRoom", { gameCode, nickname }, (response) => {
      if (response.success) {
        console.log(`Joined room successfully: ${gameCode}`);
        localStorage.setItem("roomId" , gameCode)
        console.log("Response join room : ", response)
        navigate("/lobby", { state: { lobbyID: response.gameCode, nickname } });
        // navigate("/lobby");
      } else {
        localStorage.setItem("roomId" , gameCode)
        setError(response.message);
      }
    });
  };



  const CreateContractinstance = async () => {
    // const contractAddress = "0xd6fb14f70be051fca4b29576003fcb50d2c72c67";
    // const contractabi = abi.abi;
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    
    // const contractInstance = new ethers.Contract(contractAddress, contractabi, signer);
    // console.log(contractInstance);




  }

  return (
    <section className="h-[100vh] bg-[#6B46C1] bg-opacity-90 text-white flex flex-col">

      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex gap-8">
        <div className="flex-grow">
          <Tabs defaultValue="start" className="w-full">
            <TabsList className="w-full bg-transparent text-white my-2 gap-10">
              <TabsTrigger
                value="start"
                className="bg-purple-300/80 border border-transparent data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:border-purple-500 p-3 px-20"
              >
                START
              </TabsTrigger>
              <TabsTrigger
                value="join"
                className="bg-purple-300/80 border border-transparent data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:border-purple-500 p-3 px-20"
              >
                JOIN
              </TabsTrigger>
            </TabsList>

            {/* Start Tab */}
            <TabsContent value="start" className="mt-8">
              <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                  <img
                    src="/photo1.png"
                    alt="Character Avatar"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-center">
                  CHOOSE A CHARACTER <br /> AND A NICKNAME
                </h2>
                <form
                  onSubmit={handleCreateRoom}
                  className="space-y-4 w-full max-w-md"
                >
                  <Input
                  className='bg-white/20 border-none text-white placeholder:text-white/50'
                    type="text"
                    placeholder="Enter nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                  <Select
                    onValueChange={(value) => setPlayers(value)}
                    defaultValue={players}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Players" />
                    </SelectTrigger>
                    <SelectContent>
                      {playerOptions.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value} Players
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="lg" type="submit" className="w-full bg-white text-purple-700 hover:bg-white/90">
                    START
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Join Tab */}
            <TabsContent value="join" className="mt-8">
              <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                  <img
                    src="/photo2.png"
                    alt="Character Avatar"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-center">
                  JOIN AN EXISTING GAME
                </h2>
                <form
                  onSubmit={handleJoinRoom}
                  className="space-y-4 w-full max-w-md"
                >
                  <Input
                  className='bg-white/20 border-none text-white placeholder:text-white/50'
                    type="text"
                    placeholder="Enter game code"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    required
                  />
                  <Input
                  className='bg-white/20 border-none text-white placeholder:text-white/50'
                    type="text"
                    placeholder="Enter nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  <Button size="lg" type="submit" className="w-full bg-white text-purple-700 hover:bg-white/90">
                    JOIN
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Slider />
      </main>

      {/* Footer */}
      <Footer />
    </section>
  );
}
