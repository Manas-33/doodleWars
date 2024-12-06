import { Globe, Twitch } from "lucide-react";
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

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [players, setPlayers] = useState("3");
  const navigate = useNavigate();

  const generateHexID = () => {
    return Math.random().toString(16).substring(2, 8).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hexID = generateHexID();
    navigate("/lobby", { state: { nickname, players, lobbyID: hexID } });
  };

  return (
    <section className="h-[100vh] bg-[#6B46C1] bg-opacity-90 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <img
            src="/logo.png"
            alt="LOGO Logo"
            width={300}
            height={100}
            className="mx-auto"
          />
        </div>

        <div className="flex items-center gap-2">
          <Twitch className="w-5 h-5" />
          <span className="font-medium">CONNECT WALLET</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex gap-8">
        <div className="flex-grow">
          <Tabs defaultValue="start" className="w-full">
            <TabsList className="w-full bg-transparent border-b bg-purple-800 text-white">
              <TabsTrigger
                value="start"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                START
              </TabsTrigger>
              <TabsTrigger
                value="join"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                JOIN
              </TabsTrigger>
            </TabsList>
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
                <div className="w-full max-w-md space-y-4">
                  <h2 className="text-xl font-bold text-center">
                    CHOOSE A CHARACTER
                    <br />
                    AND A NICKNAME
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <Input
                      type="text"
                      placeholder="Enter nickname"
                      className="bg-white/20 border-none text-white placeholder:text-white/50"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                    <div className="flex justify-center my-4">
                      <Select
                        onValueChange={(value) => setPlayers(value)}
                        defaultValue={players}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Players" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      size="lg"
                      type="submit"
                      className="w-full bg-white text-purple-700 hover:bg-white/90"
                    >
                      START
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="join" className="mt-8">
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
                <div className="flex flex-col items-center space-y-8">
                  <h2 className="text-xl font-bold text-center">
                    JOIN AN EXISTING GAME
                  </h2>
                  <p className="text-white/80">
                    Enter the session ID provided by the host to join a game.
                  </p>
                  <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <Input
                      type="text"
                      placeholder="Enter game code"
                      className="bg-white/20 border-none text-white placeholder:text-white/50"
                      required
                    />
                    <Button
                      size="lg"
                      type="submit"
                      className="w-full bg-white text-purple-700 hover:bg-white/90 mt-4"
                    >
                      JOIN
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-80 bg-purple-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-8">HOW TO PLAY</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center w-50 h-50">
              <img
                src="/textual_ref.gif"
                alt="Write Icon"
                width={100}
                height={100}
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">2. TIME TO WRITE</h3>
              <p>Each player must write a quirky sentence</p>
            </div>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === 2 ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex space-x-6">
            {["TERMS OF SERVICE", "PRIVACY", "ASSETS", "BLOG", "CONTACT"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm hover:text-purple-200 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
          <img src="/logo.png" alt="Logo" width={100} height={60} />
        </div>
      </footer>
    </section>
  );
}
