import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, ArrowLeft, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GameLobby() {
  const location = useLocation();
  const {
    nickname = "Player1",
    players = "3",
    lobbyID = "N/A",
  } = location.state || {};
  const playerCount = parseInt(players);
  const navigate = useNavigate();

  const [toastVisible, setToastVisible] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(lobbyID);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000); // Hide the toast after 4 seconds
    } catch (err) {
      console.error("Failed to copy text to clipboard", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#6B46C1] bg-opacity-90 p-4">
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
              {/* Display the Lobby ID */}
              <h3 className="text-sm text-white/80">LOBBY ID: {lobbyID}</h3>
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
          {/* Copy Lobby ID to Clipboard */}
          <Button
            className="bg-white text-purple-900 hover:bg-gray-100"
            onClick={handleCopyClick}
          >
            COPY LOBBY ID
          </Button>

          <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
            START
          </Button>
        </div>
      </div>
      {toastVisible && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-6 rounded-lg shadow-lg w-[300px] text-center">
          <p className="text-xg font-semibold">
            Lobby ID copied to the clipboard
          </p>
        </div>
      )}
    </div>
  );
}
