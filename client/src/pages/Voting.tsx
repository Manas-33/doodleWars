import { useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Drawing {
  id: string;
  imageUrl: string;
  nickname: string;
}

const mockDrawings: Drawing[] = [
  { id: "1", imageUrl: "/placeholder.svg?height=300&width=300", nickname: "Divesh" },
  { id: "2", imageUrl: "/placeholder.svg?height=300&width=300", nickname: "Manas" },
  { id: "3", imageUrl: "/placeholder.svg?height=300&width=300", nickname: "Aditya" },
  { id: "4", imageUrl: "/placeholder.svg?height=300&width=300", nickname: "Akshay" },
  { id: "5", imageUrl: "/placeholder.svg?height=300&width=300", nickname: "Abhinav" },
  { id: "6", imageUrl: "/placeholder.svg?height=300&width=300", nickname: "Soham" },
];

export default function VoteGrid() {
  const [selectedDrawing, setSelectedDrawing] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3000"; // Update with your actual backend URL

  const handleVote = async () => {
    if (!selectedDrawing) {
      alert("Please select a drawing to vote!");
      return;
    }

    const voter = localStorage.getItem("CurrentUser");
    if (!voter) {
      alert("Voter information missing. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Make POST request to submit the vote
      console.log("voter is : ", voter)
      console.log("submitting vote for", mockDrawings.find((drawing) => drawing.id === selectedDrawing)?.nickname)
      const response = await axios.post(
        `${API_BASE_URL}/vote`,
        {
          voter: voter, 
          target: mockDrawings.find((drawing) => drawing.id === selectedDrawing)?.nickname, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Vote submitted:", response.data);
      navigate("/standings")
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Failed to submit the vote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
