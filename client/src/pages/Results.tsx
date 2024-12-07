import { useState } from "react";
import { Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Player {
  id: string;
  name: string;
  avatar: string;
  votes: number;
  votedFor: string;
}

// Mock data - replace with actual data from your backend
const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Artist 1",
    avatar: "/placeholder.svg?height=40&width=40",
    votes: 5,
    votedFor: "Artist 3",
  },
  {
    id: "2",
    name: "Artist 2",
    avatar: "/placeholder.svg?height=40&width=40",
    votes: 2,
    votedFor: "Artist 1",
  },
  {
    id: "3",
    name: "Artist 3",
    avatar: "/placeholder.svg?height=40&width=40",
    votes: 8,
    votedFor: "Artist 5",
  },
  {
    id: "4",
    name: "Artist 4",
    avatar: "/placeholder.svg?height=40&width=40",
    votes: 3,
    votedFor: "Artist 3",
  },
  {
    id: "5",
    name: "Artist 5",
    avatar: "/placeholder.svg?height=40&width=40",
    votes: 4,
    votedFor: "Artist 3",
  },
  {
    id: "6",
    name: "Artist 6",
    avatar: "/placeholder.svg?height=40&width=40",
    votes: 1,
    votedFor: "Artist 1",
  },
];

export default function ResultsPage() {
  const [showVotingDetails, setShowVotingDetails] = useState(false);

  const sortedPlayers = [...mockPlayers].sort((a, b) => b.votes - a.votes);
  const winner = sortedPlayers[0];
  const totalVotes = mockPlayers.reduce((sum, player) => sum + player.votes, 0);

  return (
    <div className="min-h-screen bg-[#7E57C2] text-white p-6">
      <Header />
      <div className="max-w-4xl mx-auto mt-5">
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
                <h3 className="text-xl  text-white font-bold">{winner.name}</h3>
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
                <div
                  key={player.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-semibold w-6">
                      {index + 1}.
                    </div>
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
                    <div className="text-sm font-semibold w-16  text-right">
                      {player.votes} votes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Users className="mr-2" /> Voting Details
              </h2>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => setShowVotingDetails(!showVotingDetails)}
              >
                {showVotingDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>
            {showVotingDetails && (
              <div className="space-y-4">
                {mockPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={player.avatar} alt={player.name} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>{player.name}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>voted for</div>
                      <Avatar>
                        <AvatarImage
                          src={
                            mockPlayers.find((p) => p.name === player.votedFor)
                              ?.avatar
                          }
                          alt={player.votedFor}
                        />
                        <AvatarFallback>{player.votedFor[0]}</AvatarFallback>
                      </Avatar>
                      <div>{player.votedFor}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
}
