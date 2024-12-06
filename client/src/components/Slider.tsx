import { useState } from "react";
// Import Lucide React icons
import {  Edit, ThumbsUp, Award, Coins } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Coins size={48} className="text-white" />,
    title: "STAKE YOUR AMOUNT",
    description: "Each player stakes a fixed amount to join the game.",
  },
  {
    id: 2,
    icon: <Edit size={48} className="text-white" />,
    title: "DRAW YOUR WORD",
    description: "Players are given a random word and must draw it creatively.",
  },
  {
    id: 3,
    icon: <ThumbsUp size={48} className="text-white" />,
    title: "VOTE FOR THE BEST",
    description: "All players anonymously vote for the best drawing.",
  },
  {
    id: 4,
    icon: <Award size={48} className="text-white" />,
    title: "WINNER TAKES THE REWARD",
    description: "The player with the most votes wins the stake pool!",
  },
];

export default function Slider() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  };

  return (
    <div className="w-80 bg-purple-800/50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-8">HOW TO PLAY</h2>
      <div className="flex flex-col items-center">
        {/* Step Content */}
        <div className="flex flex-col items-center text-center space-y-4 h-[30vh]">
          {/* Icon */}
          <div className="w-24 h-24 flex justify-center items-center">
            {steps[currentStep].icon}
          </div>
          <h3 className="text-xl font-bold">{steps[currentStep].title}</h3>
          <p>{steps[currentStep].description}</p>
        </div>
        {/* Step Indicator with Arrows */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 bg-white/20 hover:bg-white/50 rounded-full flex justify-center items-center"
          >
            <span className="text-white text-lg font-bold">{"<"}</span>
          </button>
          {/* Step Indicators */}
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentStep ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="w-8 h-8 bg-white/20 hover:bg-white/50 rounded-full flex justify-center items-center"
          >
            <span className="text-white text-lg font-bold">{">"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
