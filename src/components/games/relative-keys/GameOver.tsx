import React from "react";

interface GameOverProps {
  score: number;
  allMatched: boolean;
  matchTimes: number[];
  onPlayAgain: () => void;
  onChangeSettings: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  allMatched,
  matchTimes,
  onPlayAgain,
  onChangeSettings,
}) => {
  return (
    <div className="fixed inset-0 bg-[#1d1d1b] bg-opacity-80 flex items-center justify-center z-10 px-4">
      <div className="bg-[#0f4c82] p-4 md:p-8 rounded-xl max-w-md w-full mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {allMatched ? "You Win!" : "Game Over"}
        </h2>
        <p className="text-xl mb-2">Final Score: {score}</p>

        {allMatched && matchTimes.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-[#c6c6c6] mb-1">Match Times:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {matchTimes.map((time, index) => (
                <span
                  key={index}
                  className="text-xs bg-[#16344e] px-2 py-1 rounded"
                >
                  {(time / 1000).toFixed(1)}s
                </span>
              ))}
            </div>
            <p className="text-sm mt-2">
              Average:{" "}
              {(
                matchTimes.reduce((a, b) => a + b, 0) /
                matchTimes.length /
                1000
              ).toFixed(1)}
              s
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <button
            className="px-6 py-3 bg-[#1f9fff] rounded-lg hover:bg-[#0f4c82] transition-colors w-full sm:w-auto"
            onClick={onPlayAgain}
          >
            Play Again
          </button>
          <button
            className="px-6 py-3 bg-[#323232] rounded-lg hover:bg-[#16344e] transition-colors border border-[#83a1bc] w-full sm:w-auto"
            onClick={onChangeSettings}
          >
            Change Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
