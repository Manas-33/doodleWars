import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pencil, Eraser, Undo, Redo, Trash2 } from "lucide-react";
import "canvas-to-blob";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Frame {
  id: number;
  imageData: ImageData | null;
}

const AnimationTool: React.FC = () => {

  const [UserName, setUserName] = useState("");


  const API_BASE_URL = "http://localhost:8000";
  // const API_BASE_URL = "https://3cc9-14-195-142-82.ngrok-free.app"

  const usernameFromLocal = localStorage.getItem("CurrentUser");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<Frame[]>([{ id: 1, imageData: null }]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [color, setColor] = useState<string>("#000000");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [thickness, setThickness] = useState<number>(2);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [futureStates, setFutureStates] = useState<ImageData[]>([]);

  const colors = [
    "#FF0000",
    "#CC0000", // Red shades
    "#FFA500",
    "#CC8400", // Orange shades
    "#FFFF00",
    "#CCCC00", // Yellow shades
    "#00FF00",
    "#00CC00", // Green shades
    "#0000FF",
    "#0000CC", // Blue shades
    "#FF00FF",
    "#CC00CC", // Purple shades
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context && frames[currentFrame].imageData) {
        context.putImageData(frames[currentFrame].imageData, 0, 0);
      } else if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [currentFrame, frames]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  let lastX: number | null = null;
  let lastY: number | null = null;

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.strokeStyle = tool === "pencil" ? color : "rgba(255,255,255,1)";
      context.lineWidth = thickness;
      context.lineCap = "round";
      context.lineJoin = "round";

      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      if (lastX !== null && lastY !== null) {
        const midX = (lastX + x) / 2;
        const midY = (lastY + y) / 2;

        context.quadraticCurveTo(lastX, lastY, midX, midY);
        context.stroke();
        context.beginPath();
        context.moveTo(midX, midY);
      }

      lastX = x;
      lastY = y;
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastX = null;
    lastY = null;
    saveCurrentFrame();
  };

  const saveCurrentFrame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        setFrames((prevFrames) => {
          const newFrames = [...prevFrames];
          newFrames[currentFrame] = { ...newFrames[currentFrame], imageData };
          return newFrames;
        });
        setHistory((prev) => [...prev, imageData]);
        setFutureStates([]);
      }
    }
  };

  const saveAsImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob, `frame-${currentFrame + 3}.png`);

          try {
            const response = await axios.post(
              `https://3cc9-14-195-142-82.ngrok-free.app/buckets/${usernameFromLocal}/files`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("File uploaded successfully:", response.data);
          } catch (error) {
            console.error("Error uploading file:");
          }
        }
      }, "image/png");
    }
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (canvas && history.length > 0) {
      const prevState = history[history.length - 1];
      const currentState = canvas
        .getContext("2d")
        ?.getImageData(0, 0, canvas.width, canvas.height);
      if (currentState) {
        setFutureStates([currentState, ...futureStates]);
        canvas.getContext("2d")?.putImageData(prevState, 0, 0);
        setHistory(history.slice(0, -1));
      }
    }
  };

  const redo = () => {
    const canvas = canvasRef.current;
    if (canvas && futureStates.length > 0) {
      const nextState = futureStates[0];
      const currentState = canvas
        .getContext("2d")
        ?.getImageData(0, 0, canvas.width, canvas.height);
      if (currentState) {
        setHistory([...history, currentState]);
        canvas.getContext("2d")?.putImageData(nextState, 0, 0);
        setFutureStates(futureStates.slice(1));
      }
    }
  };

  const eraseAll = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        saveCurrentFrame();
      }
    }
  };

  const tools = [
    { icon: <Pencil />, name: "pencil", action: () => setTool("pencil") },
    { icon: <Eraser />, name: "eraser", action: () => setTool("eraser") },
    { icon: <Trash2 />, name: "eraseAll", action: eraseAll },
    { icon: <Undo />, name: "undo", action: undo },
    { icon: <Redo />, name: "redo", action: redo },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-700 to-indigo-800 min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto gap-10 px-4 py-8">
        <div className="grid grid-cols-6 md:flex-row items-start gap-8 w-full">
          <div className="col-span-2 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full md:w-auto h-full">
            <div className="grid grid-cols-6 gap-4 mb-6">
              {colors.map((c) => (
                <div
                  key={c}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${color === c ? "ring-4 ring-white" : ""
                    }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="container mx-auto p-5">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {tools.map((toolItem) => (
                  <Button
                    key={toolItem.name}
                    variant="outline"
                    size="icon"
                    onClick={toolItem.action}
                    className={`w-14 h-14 rounded-full transition-all duration-200 ${tool === toolItem.name
                        ? "bg-indigo-500 text-white border-indigo-500 shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/20 hover:text-indigo-200 border-white/30"
                      }`}
                  >
                    {toolItem.icon}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-white mb-2">Brush Thickness</p>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[thickness]}
                onValueChange={(value) => setThickness(value[0])}
                className="w-full"
              />
            </div>
            <Button
              onClick={saveAsImage}
              className="mt-4 bg-indigo-500 text-white hover:bg-indigo-600 transition-colors px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
            >
              Submit
            </Button>
          </div>
          <div className="flex-grow">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="bg-white rounded-lg shadow-lg border-4 border-white/20"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnimationTool;