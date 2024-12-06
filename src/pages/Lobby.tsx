import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, ArrowLeft, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GameLobby() {
  const location = useLocation();
  const { nickname = "Player1", players = "3" } = location.state || {};
  const playerCount = parseInt(players);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); 
  };
  return (
    <div className="min-h-screen bg-[#6B46C1] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-white"
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2" />
            BACK
          </Button>
          <img
            src="/logo.png"
            alt="LOGO"
            width={200}
            height={80}
            className="mx-auto"
          />
          <Button variant="ghost" className="text-white">
            <Volume2 />
          </Button>
        </div>

        <div className="flex justify-center">
          <Card className="bg-[#4C1D95] w-[50%] p-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">PLAYERS 1/{playerCount}</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-[#5B21B6] p-2 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-full" />
                <span>{nickname.toUpperCase()}</span>
                <Crown className="ml-auto text-yellow-400" />
              </div>
              {[...Array(playerCount - 1)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#5B21B6] p-2 rounded-lg opacity-50"
                >
                  <div className="w-10 h-10 bg-white rounded-full" />
                  <span>WAITING</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
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
  );
}
