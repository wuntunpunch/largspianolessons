import React from "react";
import { GameMode, KeySelection, Difficulty } from "./types";
import KeySelector from "./KeySelector";

interface GameSettingsProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  keySelection: KeySelection;
  setKeySelection: (selection: KeySelection) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  showKeySelector: boolean;
  setShowKeySelector: (show: boolean) => void;
  selectedKeys: string[];
  toggleKeySelection: (key: string) => void;
  allKeys: Array<{ major: string; minor: string }>;
  onStartGame: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  gameMode,
  setGameMode,
  keySelection,
  setKeySelection,
  difficulty,
  setDifficulty,
  showKeySelector,
  setShowKeySelector,
  selectedKeys,
  toggleKeySelection,
  allKeys,
  onStartGame,
}) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Game mode selection */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4">Select Game Mode:</h2>
        <div className="flex space-x-4">
          <button
            className={`px-6 py-3 rounded-lg ${
              gameMode === "majorToMinor" ? "bg-[#1f9fff]" : "bg-[#1d1d1b]"
            } hover:bg-[#0f4c82] transition-colors`}
            onClick={() => setGameMode("majorToMinor")}
          >
            Major → Minor
          </button>
          <button
            className={`px-6 py-3 rounded-lg ${
              gameMode === "minorToMajor" ? "bg-[#1f9fff]" : "bg-[#1d1d1b]"
            } hover:bg-[#0f4c82] transition-colors`}
            onClick={() => setGameMode("minorToMajor")}
          >
            Minor → Major
          </button>
        </div>
      </div>

      {/* Key selection */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4">Key Selection:</h2>
        <div className="flex space-x-4">
          <button
            className={`px-6 py-3 rounded-lg ${
              keySelection === "all" ? "bg-[#1f9fff]" : "bg-[#1d1d1b]"
            } hover:bg-[#16344e] transition-colors`}
            onClick={() => setKeySelection("all")}
          >
            All Keys
          </button>
          <button
            className={`px-6 py-3 rounded-lg ${
              keySelection === "selected" ? "bg-[#1f9fff]" : "bg-[#1d1d1b]"
            } hover:bg-[#16344e] transition-colors`}
            onClick={() => {
              setKeySelection("selected");
              setShowKeySelector(true);
            }}
          >
            Select Keys
          </button>
        </div>
      </div>

      {/* Key selector */}
      {showKeySelector && (
        <KeySelector
          allKeys={allKeys}
          selectedKeys={selectedKeys}
          toggleKeySelection={toggleKeySelection}
          onClose={() => setShowKeySelector(false)}
        />
      )}

      {/* Difficulty selection */}
      {!showKeySelector && (
        <>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-4">Select Difficulty:</h2>
            <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-4">
              <button
                className={`px-6 py-3 rounded-lg ${
                  difficulty === "easy"
                    ? "bg-[#1f9fff] text-white"
                    : "bg-[#1d1d1b] text-white"
                } hover:bg-[#16344e] transition-colors w-full`}
                onClick={() => setDifficulty("easy")}
              >
                Easy (3 keys)
              </button>
              <button
                className={`px-6 py-3 rounded-lg ${
                  difficulty === "medium"
                    ? "bg-[#1f9fff] text-white"
                    : "bg-[#1d1d1b] text-white"
                } hover:bg-[#16344e] transition-colors w-full`}
                onClick={() => setDifficulty("medium")}
              >
                Medium (5 keys)
              </button>
              <button
                className={`px-6 py-3 rounded-lg ${
                  difficulty === "hard"
                    ? "bg-[#1f9fff] text-white"
                    : "bg-[#1d1d1b] text-white"
                } hover:bg-[#16344e] transition-colors w-full`}
                onClick={() => setDifficulty("hard")}
              >
                Hard (8 keys)
              </button>
            </div>
          </div>
          <button
            className="px-8 py-4 bg-[#1f9fff] rounded-lg text-xl hover:bg-[#0f4c82] transition-colors"
            onClick={onStartGame}
            disabled={keySelection === "selected" && selectedKeys.length === 0}
          >
            Start Game
          </button>
          <div className="max-w-lg text-center mt-4">
            <h3 className="text-xl mb-2">How to Play:</h3>
            <p>
              {gameMode === "majorToMinor"
                ? "Drag each major key to its relative minor key. "
                : "Drag each minor key to its relative major key. "}
              Match all keys before the time runs out!
            </p>
            <p className="mt-2 text-sm text-[#c6c6c6]">
              Remember: A relative minor is 3 half steps below its major key, or
              at the 6th scale degree.
            </p>
            <p className="mt-2 text-sm text-[#a5d9ff]">
              Fast matches earn bonus points! Match quickly to maximize your
              score.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GameSettings;
