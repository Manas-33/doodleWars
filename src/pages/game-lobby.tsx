import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Crown, ChevronDown, Volume2, ArrowLeft } from 'lucide-react'

interface GameMode {
  id: string
  name: string
  icon: string
}

export default function GameLobby() {
  return (
    <div className="min-h-screen bg-[#6B46C1] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="mr-2" />
            BACK
          </Button>
          <img
            src="/placeholder.svg"
            alt="LOGO"
            width={200}
            height={80}
            className="mx-auto"
          />
          <Button variant="ghost" className="text-white">
            <Volume2 />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Players Section */}
          <Card className="bg-[#4C1D95] p-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">PLAYERS 1/14</h2>
              <Button variant="ghost" className="text-white">
                14 PLAYERS
                <ChevronDown className="ml-2" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-[#5B21B6] p-2 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-full" />
                <span>COOLNICKNAME3432</span>
                <Crown className="ml-auto text-yellow-400" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#5B21B6] p-2 rounded-lg opacity-50">
                  <div className="w-10 h-10 bg-white rounded-full" />
                  <span>EMPTY</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Game Modes Section */}
          {/* <div className="space-y-6"> */}
            {/* <h2 className="text-xl text-white">PRESETS</h2>
            <div className="grid grid-cols-3 gap-4">
              {gameModes.map((mode) => (
                <Card
                  key={mode.id}
                  className={`p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
                    ${mode.id === "normal" ? "bg-emerald-100" : "bg-[#9F7AEA]"}`}
                >
                  <Image
                    src={mode.icon}
                    alt={mode.name}
                    width={40}
                    height={40}
                    className="mb-2"
                  />
                  <span className="text-sm font-medium text-center">
                    {mode.name}
                  </span>
                </Card>
              ))}
            </div>
          </div> */}
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button className="bg-white text-purple-900 hover:bg-gray-100">
            INVITE
          </Button>
          <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
            START
          </Button>
        </div>
      </div>
    </div>
  )
}

