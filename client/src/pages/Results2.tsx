import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define the VoteData interface
interface VoteData {
  votes: Record<string, string>; // Tracks who voted for whom
  voteCounts: Record<string, number>; // Tracks total votes for each target
}

export default function Results2() {
  const [voteData, setVoteData] = useState<VoteData | null>(null); // Set initial state to null

  useEffect(() => {
    const fetchVotingResults = async () => {
      try {
        const response = await axios.get("http://localhost:3000/votes");
        setVoteData(response.data);
        console.log("Response data: ", response.data);
      } catch (error) {
        console.error("Error fetching voting results:", error);
      }
    };

    fetchVotingResults();
  }, []);

  // Return loading state while the data is being fetched
  if (!voteData) {
    return <div>Loading...</div>;
  }

  // Sort the players by votes
  const sortedPlayers = Object.entries(voteData.voteCounts)
    .map(([name, votes]) => ({
      name,
      votes,
      avatar: "/placeholder.svg?height=40&width=40",
    }))
    .sort((a, b) => b.votes - a.votes);

  const winner = sortedPlayers[0];
  const totalVotes = Object.values(voteData.voteCounts).reduce((sum, votes) => sum + votes, 0);

  return (
    <div className="min-h-screen bg-[#7E57C2] text-white p-6 ">
      <Header />
      <div className="max-w-4xl mx-auto mt-5 h-[70vh]">
        <Card className="bg-white/10 border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Trophy className="mr-2" /> Winner
              </h2>
              <div className="text-lg font-semibold">{winner.votes} votes</div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={winner.avatar} alt={winner.name} />
                <AvatarFallback>{winner.name[0]}</AvatarFallback>
              </Avatar>
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

        <Card className="bg-white/10 border-white/20 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Results</h2>
            <div className="space-y-4">
              {sortedPlayers.map((player, index) => (
                <div key={player.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-semibold w-6">{index + 1}.</div>
                    <Avatar>
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name[0]}</AvatarFallback>
                    </Avatar>
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
