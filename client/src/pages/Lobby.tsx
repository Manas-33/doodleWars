import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2 } from "lucide-react";
import { io } from "socket.io-client";
import { ethers } from "ethers";
import axios from "axios";
const socket = io("http://localhost:3000");

export default function GameLobby() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Loacation state: ", location.state);
  const { lobbyID = "", nickname = "Player1" } = location.state || {};

  const [players, setPlayers] = useState([]);
  const [Staked, setStaked] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  console.log("roomId: ", lobbyID);
  localStorage.setItem("roomId", lobbyID);
  console.log("nickname: ", nickname);
  localStorage.setItem("nickname", nickname);

  const handlePlayerUpdates = useCallback((updatedPlayers) => {
    console.log("Updated players", updatedPlayers);
    // Filter out any null players
    setPlayers(updatedPlayers.filter((player) => player != null));
  }, []);

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

    socket.on("updatePlayers", handlePlayerUpdates);

    return () => {
      socket.off("updatePlayers", handlePlayerUpdates);
    };
  }, []);

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

  const stakeAmountinETH = async () => {
    const DOOD_ABI = [
      "function transfer(address to, uint256 amount) external returns (bool)",
    ];

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const contractAddress = "0x07FCBd2412E0fFd9eaE62daBCC86D790f36161D5";
    const actualContractAddress = "0xd6fb14f70be051fca4b29576003fcb50d2c72c67";
    const contractabi = DOOD_ABI;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractabi,
      signer
    );

    const tokenAmount = ethers.utils.parseUnits("10000", 18);

    const tx = await contractInstance.transfer(
      actualContractAddress,
      tokenAmount.toString()
    );
    await tx.wait();

    console.log("Tokens Staked Successfully");

    if (tx) {
      setStaked(true);
      const getUserName = localStorage.getItem("CurrentUser");
      await axios
        .post(`https://3cc9-14-195-142-82.ngrok-free.app/buckets`, {
          bucketName: `${getUserName}`,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(`Error is Occured : ${err}`);
        });
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

        {/* Lobby Details */}
        <div className="flex justify-center">
          <Card className="bg-[#4C1D95] w-[50%] p-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">PLAYERS {players.length}/4</h2>
              <h3 className="text-sm text-white/80">LOBBY ID: {lobbyID}</h3>
            </div>

            {/* Player List */}
            <div className="space-y-2">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#5B21B6] p-2 rounded-lg"
                >
                  <div className="w-10 h-10 bg-white rounded-full" />
                  <span>{player}</span>

                  {player == localStorage.getItem("CurrentUser") ? (
                    <>
                      <Button
                        style={{ marginLeft: "30px" }}
                        onClick={stakeAmountinETH}
                      >
                        Stake 10000 DOOD
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            className="bg-white text-purple-900 hover:bg-gray-100"
            onClick={handleCopyClick}
          >
            COPY LOBBY ID
          </Button>
          {Staked ? (
            <Button
              onClick={navigate("/draw")}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              START
            </Button>
          ) : (
            <>
              <button>Please Stake</button>
            </>
          )}
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
