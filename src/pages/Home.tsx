import { Globe, Twitch } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#6441a5] bg-opacity-90 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-opacity-20 bg-black rounded-full px-4 py-2">
          <Globe className="w-5 h-5" />
          <span>EN</span>
        </div>
        
        <img
          src="/placeholder.svg"
          alt="Gartic Phone Logo"
          width={300}
          height={100}
          className="mx-auto"
        />
        
        <div className="flex items-center gap-2">
          <Twitch className="w-5 h-5" />
          <span className="font-medium">LIVE STREAMERS</span>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
              >
                <img
                  src="/placeholder.svg"
                  alt={`Streamer ${i}`}
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex gap-8">
        <div className="flex-grow">
          <Tabs defaultValue="anonymous" className="w-full">
            <TabsList className="w-full bg-transparent border-b">
              <TabsTrigger
                value="anonymous"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                ANONYMOUS
              </TabsTrigger>
              <TabsTrigger
                value="authenticated"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                AUTHENTICATED
              </TabsTrigger>
            </TabsList>
            <TabsContent value="anonymous" className="mt-8">
              <div className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <img
                    src="/placeholder.svg"
                    alt="Character Avatar"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-full max-w-md space-y-4">
                  <h2 className="text-xl font-bold text-center">
                    CHOOSE A CHARACTER
                    <br />
                    AND A NICKNAME
                  </h2>
                  <Input
                    type="text"
                    placeholder="Enter nickname"
                    className="bg-white/20 border-none text-white placeholder:text-white/50"
                  />
                  <Button
                    size="lg"
                    className="w-full bg-white text-purple-700 hover:bg-white/90"
                  >
                    START
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-80 bg-purple-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-8">HOW TO PLAY</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center w-20 h-20">
              <img
                src="/placeholder.svg"
                alt="Write Icon"
                width={80}
                height={80}
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">2. TIME TO WRITE</h3>
              <p>Each player must write a quirky sentence</p>
            </div>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === 2 ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 mt-auto">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <img
            src="/placeholder.svg"
            alt="Gartic Logo"
            width={100}
            height={40}
          />
          <div className="flex space-x-6">
            {["TERMS OF SERVICE", "PRIVACY", "ASSETS", "BLOG", "CONTACT"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm hover:text-purple-200 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
          <img
            src="/placeholder.svg"
            alt="Onrizon Logo"
            width={100}
            height={40}
          />
        </div>
      </footer>
    </div>
  )
}

