import { Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Prompt() {
  return (
    <div className="min-h-screen bg-[#6B46C1] flex flex-col items-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">1/1</div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-2">
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="LOGO"
              className="h-10"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-4 border-white border-t-transparent" />
          </div>
        </div>

        {/* Phone Icon */}
        {/* <div className="flex justify-center mb-12">
          <div className="w-32 h-32 relative">
            <Phone className="w-full h-full text-blue-500 transform -rotate-12" strokeWidth={3} />
          </div>
        </div> */}

        {/* Input Section */}
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-bold text-white tracking-wider drop-shadow-lg">
            WRITE A SENTENCE
          </h2>
          <div className="flex gap-4">
            <Input 
              className="bg-white/90 backdrop-blur-sm text-lg p-6 rounded-xl"
              placeholder="Type your sentence..."
              defaultValue="Chef stretching in a lab"
            />
            <Button 
              className="bg-white text-indigo-900 hover:bg-white/90 font-bold text-lg px-6 rounded-xl"
            >
              DONE!
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

