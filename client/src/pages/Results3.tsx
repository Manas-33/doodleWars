import { useState, useEffect } from "react";
import io from "socket.io-client"; // Import Socket.IO client
import axios from "axios";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Progress } from "@radix-ui/react-progress";
import Footer from "@/components/Footer";


interface VoteData {
    votes: Record<string, string>; // Tracks who voted for whom
    voteCounts: Record<string, number>; // Tracks total votes for each target
}
const socket = io("http://localhost:3000"); // Connect to the Socket.IO server

export default function Results3() {
    const [voteCounts, setVoteCounts] = useState<Record<string, number>>({}); 
  
    useEffect(() => {
      // Listen for real-time vote updates
      socket.on("updateVoteResults", (updatedVoteCounts) => {
        console.log("Updated vote counts received: ", updatedVoteCounts);
        setVoteCounts(updatedVoteCounts);
      });
  
      // Cleanup the listener on component unmount
      return () => {
        socket.off("updateVoteResults");
      };
    }, [voteCounts]);
  
    console.log("Vote Count length: ",Object.keys(voteCounts).length )
    // Early return if no data
    if (!Object.keys(voteCounts).length) {
      return <div>Loading...</div>;
    }
  
    // Sort players based on votes
    const sortedPlayers = Object.entries(voteCounts)
      .map(([name, votes]) => ({
        name,
        votes,
        avatar: "/placeholder.svg?height=40&width=40",
      }))
      .sort((a, b) => b.votes - a.votes);
  
    const winner = sortedPlayers[0];
    const totalVotes = Object.values(voteCounts).reduce((sum, votes) => sum + votes, 0);
  
    return (
      <div className="min-h-screen bg-[#7E57C2] text-white p-6">
        <Header />
        <div className="max-w-4xl mx-auto mt-5 h-[70vh]">
          {/* Winner Section */}
          <Card className="bg-white/10 border-white/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <Trophy className="mr-2" /> Winner
                </h2>
                <div className="text-lg font-semibold">Total {winner.votes} votes</div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <Avatar className="h-20 w-20">
                  <AvatarImage src={winner.avatar} alt={winner.name} />
                  <AvatarFallback>{winner.name[0]}</AvatarFallback>
                </Avatar> */}
                <div>
                  <h3 className="text-xl text-white font-bold">{winner.name}</h3>
                  <Progress
                    value={(winner.votes / totalVotes) * 100}
                    className="w-64 mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* All Results Section */}
          <Card className="bg-white/10 border-white/20 mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">All Results</h2>
              <div className="space-y-4">
                {sortedPlayers.map((player, index) => (
                  <div key={player.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-semibold w-6">{index + 1}.</div>
                      {/* <Avatar>
                        <AvatarImage src={player.avatar} alt={player.name} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar> */}
                      <div>{player.name}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress
                        value={(player.votes / totalVotes) * 100}
                        className="w-32"
                      />
                      <div className="text-sm font-semibold w-16 text-right">
                        {player.votes} votes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
        <div className="mt-4">
          <Footer />
        </div>
      </div>
    );
  }
