import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react"; // Assuming you're using this icon for selected vote
import { RefreshCw } from "lucide-react"; // Assuming this is your loading animation
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const mockDrawings = [
  { id: 1, nickname: "Akshay", imageUrl: "/path/to/image1.jpg" },
  { id: 2, nickname: "Manas", imageUrl: "/path/to/image2.jpg" },
  { id: 3, nickname: "Aditya", imageUrl: "/path/to/image3.jpg" },
  { id: 4, nickname: "Divesh", imageUrl: "/path/to/image2.jpg" },
  { id: 5, nickname: "Abhinav", imageUrl: "/path/to/image3.jpg" },
];


export default function VotingPage() {
  const [selectedDrawing, setSelectedDrawing] = useState<number | null>(null);
  const [voteData, setVoteData] = useState<{ voteCounts: Record<string, number>; votes: Record<string, string> }>({
    voteCounts: {},
    votes: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const gameCode = localStorage.getItem("roomId");

  useEffect(() => {
    const socket = io("http://localhost:3000");
    // Emit the event to fetch the players
    socket.emit("getPlayers", gameCode, (response) => {
        console.log("Response from get players: ", response)
        console.log("List of players: ", response.players)
        setPlayers(response.players); 
    });

    // Listen for any updates to players in real-time
    socket.on("updatePlayers", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    // Clean up the listener
    return () => {
      socket.off("updatePlayers");
    };
  }, [gameCode]);

  // Establish socket connection
  useEffect(() => {
    const socket = io("http://localhost:3000");
    // Listen for vote update events
    socket.on("updateVoteResults", (updatedVoteCounts: Record<string, number>) => {
      setVoteData((prevVoteData) => ({
        ...prevVoteData,
        voteCounts: updatedVoteCounts,
      }));
    });

    // Handle socket connection cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleVote = () => {
    if (selectedDrawing === null) return;

    setIsSubmitting(true);

    // Emit vote event to backend
    const socket = io("http://localhost:3000");
    const voter = localStorage.getItem('CurrentUser') 
    const target = mockDrawings.find((drawing) => drawing.id === selectedDrawing)?.nickname;

    socket.emit("vote", { voter, target });

    // Optionally, update local state immediately (optimistic UI)
    setVoteData((prevVoteData) => {
      const updatedVoteCounts = { ...prevVoteData.voteCounts };
      updatedVoteCounts[target] = updatedVoteCounts[target] ? updatedVoteCounts[target] + 1 : 1;
      return {
        ...prevVoteData,
        voteCounts: updatedVoteCounts,
        votes: { ...prevVoteData.votes, [voter]: target },
      };
    });
    
    navigate("/standings")
    // Reset selected drawing and submitting state after a brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedDrawing(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#7E57C2] text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <Header />

        {/* Main Content */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">CHOOSE THE BEST DRAWING</h2>
            <p className="text-white/80">Select your favorite drawing from this round</p>
          </div>

          {/* Drawing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDrawings.map((drawing) => (
              <Card
                key={drawing.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-200 bg-white/10 hover:bg-white/20 border-2 ${
                  selectedDrawing === drawing.id
                    ? "border-white scale-[1.02]"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedDrawing(drawing.id)}
              >
                <div className="aspect-square relative">
                  <img
                    src={drawing.imageUrl}
                    alt={`Drawing by ${drawing.nickname}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedDrawing === drawing.id && (
                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                      <Check className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleVote}
              disabled={isSubmitting}
              className="bg-white text-[#7E57C2] hover:bg-white/90 px-8 py-6 text-lg font-bold"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  SUBMITTING...
                </>
              ) : (
                "SUBMIT VOTE"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
