import React from "react";

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  onReset: () => void;
  lastMatchBonus?: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  timeLeft,
  onReset,
  lastMatchBonus,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-xl">
        Score: <span className="font-bold">{score}</span>
        {lastMatchBonus !== undefined && (
          <span className="text-sm ml-2 text-[#a5d9ff]">
            Last match: +{lastMatchBonus} time bonus
          </span>
        )}
      </div>
      <div className="text-xl">
        Time:{" "}
        <span className={`font-bold ${timeLeft < 10 ? "text-[#1f9fff]" : ""}`}>
          {timeLeft}
        </span>
        s
      </div>
      <button
        className="px-4 py-2 bg-[#1d1d1b] rounded hover:bg-[#16344e] transition-colors"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default GameHeader;
