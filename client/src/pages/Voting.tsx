import { useState } from "react"
// import { motion } from "framer-motion"
import { Check, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/Header"
// import { useToast } from "@/components/ui/use-toast"

interface Drawing {
  id: string
  imageUrl: string
  artistName: string
}

// Mock data - replace with actual data in a real application
const mockDrawings: Drawing[] = [
  { id: "1", imageUrl: "/placeholder.svg?height=300&width=300", artistName: "Artist 1" },
  { id: "2", imageUrl: "/placeholder.svg?height=300&width=300", artistName: "Artist 2" },
  { id: "3", imageUrl: "/placeholder.svg?height=300&width=300", artistName: "Artist 3" },
  { id: "4", imageUrl: "/placeholder.svg?height=300&width=300", artistName: "Artist 4" },
  { id: "5", imageUrl: "/placeholder.svg?height=300&width=300", artistName: "Artist 5" },
  { id: "6", imageUrl: "/placeholder.svg?height=300&width=300", artistName: "Artist 6" },
]

export default function VoteGrid() {
  const [selectedDrawing, setSelectedDrawing] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
//   const { toast } = useToast()

  const handleVote = async () => {
    if (!selectedDrawing) {
    //   toast({
    //     title: "Selection Required",
    //     description: "Please select your favorite drawing before voting!",
    //     variant: "destructive",
    //   })
      return
    }

    setIsSubmitting(true)
    // Simulating an API call to submit the vote
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)

    // toast({
    //   title: "Vote Submitted!",
    //   description: `You voted for ${mockDrawings.find(d => d.id === selectedDrawing)?.artistName}'s drawing.`,
    // })
  }

  return (
    <div className="min-h-screen bg-[#7E57C2] text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
      <Header/>

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
                    alt={`Drawing by ${drawing.artistName}`}
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
  )
}

