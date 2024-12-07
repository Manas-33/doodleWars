import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2 } from "lucide-react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function GameLobby() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Loacation state: ", location.state)
  const { lobbyID = "", nickname = "Player1" } = location.state || {};
  
  const [players, setPlayers] = useState([]);

  console.log("roomId: ", lobbyID);
  console.log("nickname: ", nickname);

  useEffect(() => {
    if (!lobbyID || !nickname) {
      console.log("Invalid lobby ID or nickname");
      navigate("/"); 
      return;
    }

    // Emit joinRoom event to join the room
    socket.emit("joinRoom", { gameCode: lobbyID, nickname }, (response) => {
      if (!response.success) {
        console.log("Joinroom error hit");
        console.error(response.message);
        navigate("/"); // Redirect to home if joining fails
      }
    });

    // Listen for player updates and filter out null values
    const handlePlayerUpdates = (updatedPlayers) => {
      console.log("Updated players", updatedPlayers);
      // Filter out any null players
      setPlayers(updatedPlayers.filter(player => player != null));
    };

    socket.on("updatePlayers", handlePlayerUpdates);

    return () => {
      socket.off("updatePlayers", handlePlayerUpdates); // Clean up the listener when the component unmounts
    };
  }, [lobbyID, nickname, navigate]);

  const handleBackClick = () => {
    navigate("/");
  };

  // const handleCopyClick = async () => {
  //   try {
  //     await navigator.clipboard.writeText(roomId + "");
  //     setToastVisible(true);
  //     setTimeout(() => setToastVisible(false), 4000);
  //   } catch (err) {
  //     console.error("Failed to copy text to clipboard", err);
  //   }
  // };

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

        {/* Lobby Details */}
        <div className="flex justify-center">
          <Card className="bg-[#4C1D95] w-[50%] p-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">PLAYERS {players.length}/4</h2>
              <h3 className="text-sm text-white/80">LOBBY ID: {lobbyID}</h3>
            </div>

            {/* Player List */}
            <div className="space-y-2">
            {players
              .map((player, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#5B21B6] p-2 rounded-lg"
                >
                  <div className="w-10 h-10 bg-white rounded-full" />
                  <span>{player}</span>
                  
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            className="bg-white text-purple-900 hover:bg-gray-100"
            // onClick={handleCopyClick}
          >
            COPY LOBBY ID
          </Button>
          <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
            START
          </Button>
        </div>
      </div>

      {/* Toast Notification */}
      {/* {toastVisible && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-6 rounded-lg shadow-lg w-[300px] text-center">
          <p className="text-lg font-semibold">
            Lobby ID copied to the clipboard
          </p>
        </div>
      )} */}
    </div>
  );
}
