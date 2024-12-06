import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Pencil, Eraser, Undo, Redo } from 'lucide-react';
import 'canvas-to-blob';

interface Frame {
  id: number;
  imageData: ImageData | null;
}

const AnimationTool: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<Frame[]>([{ id: 1, imageData: null }]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [color, setColor] = useState<string>('#000000');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [thickness, setThickness] = useState<number>(2);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [futureStates, setFutureStates] = useState<ImageData[]>([]);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context && frames[currentFrame].imageData) {
        context.putImageData(frames[currentFrame].imageData, 0, 0);
      } else if (context) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [currentFrame, frames]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
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
  const context = canvas?.getContext('2d');
  if (context) {
    context.strokeStyle = tool === 'pencil' ? color : 'rgba(255,255,255,1)';
    context.lineWidth = thickness;
    context.lineCap = 'round';
    context.lineJoin = 'round';

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


//   const stopDrawing = () => {
//     setIsDrawing(false);
//     saveCurrentFrame();
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext('2d');
//     if (context) {
//       if (tool === 'pencil') {
//         context.globalCompositeOperation = 'source-over';
//         context.strokeStyle = color;
//       } else {
//         context.globalCompositeOperation = 'destination-out';
//         context.strokeStyle = 'rgba(255,255,255,1)';
//       }
//       context.lineWidth = thickness;
//       context.lineCap = 'round';
//       context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//       context.stroke();
//     }
//   };

  const saveCurrentFrame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        setFrames(prevFrames => {
          const newFrames = [...prevFrames];
          newFrames[currentFrame] = { ...newFrames[currentFrame], imageData };
          return newFrames;
        });
        setHistory(prev => [...prev, imageData]);
        setFutureStates([]);
      }
    }
  };

  const addNewFrame = () => {
    setFrames(prevFrames => [...prevFrames, { id: prevFrames.length + 1, imageData: null }]);
    setCurrentFrame(frames.length);
  };

  const switchFrame = (index: number) => {
    saveCurrentFrame();
    setCurrentFrame(index);
  };

  const saveAsImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `frame-${currentFrame + 1}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    }
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (canvas && history.length > 0) {
      const prevState = history[history.length - 1];
      const currentState = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height);
      if (currentState) {
        setFutureStates([currentState, ...futureStates]);
        canvas.getContext('2d')?.putImageData(prevState, 0, 0);
        setHistory(history.slice(0, -1));
      }
    }
  };

  const redo = () => {
    const canvas = canvasRef.current;
    if (canvas && futureStates.length > 0) {
      const nextState = futureStates[0];
      const currentState = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height);
      if (currentState) {
        setHistory([...history, currentState]);
        canvas.getContext('2d')?.putImageData(nextState, 0, 0);
        setFutureStates(futureStates.slice(1));
      }
    }
  };

  const tools = [
    { icon: <Pencil />, name: 'pencil', action: () => setTool('pencil') },
    { icon: <Eraser />, name: 'eraser', action: () => setTool('eraser') },
    { icon: <Undo />, name: 'undo', action: undo },
    { icon: <Redo />, name: 'redo', action: redo },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <header className="w-full bg-purple-600 p-4 text-center">
        <h1 className="text-green-400 text-2xl font-bold">Animation Tool</h1>
      </header>

      <main className="flex flex-col items-center mt-8 w-full max-w-4xl">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="border border-gray-300 bg-white"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
        />

        <div className="flex justify-center mt-4 space-x-2">
          {colors.map((c) => (
            <div
              key={c}
              className={`w-8 h-8 rounded-full cursor-pointer ${color === c ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {tools.map((toolItem) => (
            <Button
              key={toolItem.name}
              variant="outline"
              size="icon"
              onClick={toolItem.action}
              className={tool === toolItem.name ? 'bg-blue-200' : ''}
            >
              {toolItem.icon}
            </Button>
          ))}
        </div>

        <Slider
          min={1}
          max={20}
          step={1}
          value={[thickness]}
          onValueChange={(value) => setThickness(value[0])}
          className="w-64 mt-4"
        />

        <div className="flex justify-center mt-4 space-x-2">
          {frames.map((frame, index) => (
            <div
              key={frame.id}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                index === currentFrame ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => switchFrame(index)}
            />
          ))}
          <Button onClick={addNewFrame} variant="outline" size="icon">
            +
          </Button>
        </div>

        <Button onClick={saveAsImage} className="mt-4 mr-2">Save Frame</Button>
        <Button className="mt-4">DONE!</Button>
      </main>
    </div>
  );
};

export default AnimationTool;

