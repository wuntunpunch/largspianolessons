"use client";

import React, { useState, useEffect } from "react";

// Define types
interface Key {
  id: string;
  name: string;
  matched: boolean;
  type: "major" | "minor";
}

interface Target {
  id: string;
  name: string;
  filled: boolean;
  type: "major" | "minor";
}

type GameMode = "majorToMinor" | "minorToMajor";
type KeySelection = "all" | "selected";

const RelativeKeysGame = (): JSX.Element => {
  // Game state
  const [items, setItems] = useState<Key[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [gameMode, setGameMode] = useState<GameMode>("majorToMinor");
  const [keySelection, setKeySelection] = useState<KeySelection>("all");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    "C",
    "G",
    "D",
    "A",
    "E",
    "B",
    "F♯",
    "C♯",
    "F",
    "B♭",
    "E♭",
    "A♭",
  ]);
  const [showKeySelector, setShowKeySelector] = useState(false);
  const [lastMatchTime, setLastMatchTime] = useState<number>(0);
  const [matchTimes, setMatchTimes] = useState<number[]>([]);

  // Custom color constants based on brand colors
  const COLORS = {
    darkest: "#1d1d1b", // Almost black
    dark: "#323232", // Dark gray
    navy: "#16344e", // Dark navy blue
    blue: "#0f4c82", // Medium blue
    lightBlue: "#83a1bc", // Light blue/gray
    brightBlue: "#1f9fff", // Bright/accent blue - Used for selected state
    paleBlue: "#a5d9ff", // Very light blue
    lightGray: "#c6c6c6", // Light gray
    offWhite: "#f6f6f6", // Almost white
  };

  // All possible keys
  const allKeys = [
    { major: "C", minor: "A" },
    { major: "G", minor: "E" },
    { major: "D", minor: "B" },
    { major: "A", minor: "F♯" },
    { major: "E", minor: "C♯" },
    { major: "B", minor: "G♯" },
    { major: "F♯", minor: "D♯" },
    { major: "C♯", minor: "A♯" },
    { major: "F", minor: "D" },
    { major: "B♭", minor: "G" },
    { major: "E♭", minor: "C" },
    { major: "A♭", minor: "F" },
    { major: "D♭", minor: "B♭" },
    { major: "G♭", minor: "E♭" },
    { major: "C♭", minor: "A♭" },
  ];

  // Filter major keys based on selection
  const filteredKeys = allKeys.filter(
    (key) => keySelection === "all" || selectedKeys.includes(key.major)
  );

  // Get number of items based on difficulty
  const getItemCount = (): number => {
    switch (difficulty) {
      case "easy":
        return 3;
      case "medium":
        return 5;
      case "hard":
        return Math.min(8, filteredKeys.length);
      default:
        return 3;
    }
  };

  // Initialize game
  const initializeGame = (): void => {
    const itemCount = getItemCount();
    const newItems: Key[] = [];
    const newTargets: Target[] = [];

    // Shuffle and take only the number of keys needed for this difficulty
    const shuffledKeys = [...filteredKeys]
      .sort(() => 0.5 - Math.random())
      .slice(0, itemCount);

    // Create pairs of items and targets with matching relative keys
    shuffledKeys.forEach((keyPair, index) => {
      const id = `key-${index}`;

      if (gameMode === "majorToMinor") {
        // Major keys as items, minor keys as targets
        newItems.push({
          id,
          name: keyPair.major,
          matched: false,
          type: "major",
        });

        newTargets.push({
          id,
          name: keyPair.minor,
          filled: false,
          type: "minor",
        });
      } else {
        // Minor keys as items, major keys as targets
        newItems.push({
          id,
          name: keyPair.minor,
          matched: false,
          type: "minor",
        });

        newTargets.push({
          id,
          name: keyPair.major,
          filled: false,
          type: "major",
        });
      }
    });

    // Shuffle both items and targets for gameplay
    const shuffledItems = [...newItems].sort(() => 0.5 - Math.random());
    const shuffledTargets = [...newTargets].sort(() => 0.5 - Math.random());

    setItems(shuffledItems);
    setTargets(shuffledTargets);
    setScore(0);
    setGameOver(false);
    setTimeLeft(60);
    setGameStarted(true);
    setLastMatchTime(Date.now());
    setMatchTimes([]);
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameOver, timeLeft]);

  // Check if all items are matched
  useEffect(() => {
    if (items.length > 0 && items.every((item) => item.matched)) {
      setGameOver(true);
    }
  }, [items]);

  // Handle drag start
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string
  ): void => {
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.classList.add("opacity-50");
  };

  // Handle drag end
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove("opacity-50");
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.currentTarget.classList.add(
      "border-dashed",
      "border-2",
      "border-[#f6f6f6]"
    );
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove(
      "border-dashed",
      "border-2",
      "border-[#f6f6f6]"
    );
  };

  // Handle drop
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string
  ): void => {
    e.preventDefault();
    e.currentTarget.classList.remove(
      "border-dashed",
      "border-2",
      "border-[#f6f6f6]"
    );

    const itemId = e.dataTransfer.getData("text/plain");
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastMatchTime;

    // Check if correct match
    if (itemId === targetId) {
      // Calculate time bonus
      const timeBonus = calculateTimeBonus(timeElapsed);
      const newScore = score + 10 + timeBonus;

      // Update items
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, matched: true } : item
        )
      );

      // Update targets
      setTargets((prevTargets) =>
        prevTargets.map((target) =>
          target.id === targetId ? { ...target, filled: true } : target
        )
      );

      // Save match time for statistics
      setMatchTimes((prev) => [...prev, timeElapsed]);

      // Update last match time and score
      setLastMatchTime(currentTime);
      setScore(newScore);
    } else {
      // Wrong match penalty
      setScore((prev) => Math.max(0, prev - 2));
    }
  };

  // Reset game
  const resetGame = (): void => {
    setItems([]);
    setTargets([]);
    setGameStarted(false);
    setGameOver(false);
    setShowKeySelector(false);
  };

  // Toggle key selection
  const toggleKeySelection = (key: string): void => {
    setSelectedKeys((prev) => {
      if (prev.includes(key)) {
        // Remove the key if it's already selected
        return prev.filter((k) => k !== key);
      } else {
        // Add the key if it's not already selected
        return [...prev, key];
      }
    });
  };

  // Get style class for key type
  const getKeyTypeStyle = (type: "major" | "minor"): string => {
    return type === "major"
      ? "bg-[#1f9fff] hover:bg-[#0f4c82] text-[#f6f6f6]"
      : "bg-[#83a1bc] hover:bg-[#16344e] text-[#f6f6f6]";
  };

  // Calculate time-based bonus points
  const calculateTimeBonus = (timeElapsed: number): number => {
    // Convert milliseconds to seconds for calculation
    const secondsElapsed = timeElapsed / 1000;

    // Base formula: faster matches get higher bonuses
    // Max bonus of 5 points for matches under 1 second
    // Bonus decreases as time increases, with minimum of 1 point
    const bonus = Math.max(1, Math.min(5, Math.floor(5 - secondsElapsed)));

    return bonus;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative p-4 text-white py-20">
      {/* Dark gradient background added to bottom portion */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-gray-100 to-blue-800"></div>

      {/* Main content container with dark background */}
      <div className="bg-[#0f4c82]/60 p-8 rounded-xl shadow-xl relative z-10 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Relative Keys</h1>

        {!gameStarted ? (
          <div className="flex flex-col items-center space-y-6">
            {/* Game mode selection */}
            <div className="flex flex-col items-center">
              <h2 className="text-2xl mb-4">Select Game Mode:</h2>
              <div className="flex space-x-4">
                <button
                  className={`px-6 py-3 rounded-lg ${
                    gameMode === "majorToMinor"
                      ? "bg-[#1f9fff]"
                      : "bg-[#1d1d1b]"
                  } hover:bg-[#0f4c82] transition-colors`}
                  onClick={() => setGameMode("majorToMinor")}
                >
                  Major → Minor
                </button>
                <button
                  className={`px-6 py-3 rounded-lg ${
                    gameMode === "minorToMajor"
                      ? "bg-[#1f9fff]"
                      : "bg-[#1d1d1b]"
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
                    keySelection === "selected"
                      ? "bg-[#1f9fff]"
                      : "bg-[#1d1d1b]"
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
              <div className="bg-[#1d1d1b] p-4 rounded-lg max-w-lg">
                <h3 className="text-xl mb-4 text-center">
                  Select Keys to Practice:
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                  {allKeys.map((key) => (
                    <button
                      key={key.major}
                      className={`px-3 py-2 rounded ${
                        selectedKeys.includes(key.major)
                          ? "bg-[#1f9fff]"
                          : "bg-[#16344e]"
                      } hover:bg-[#0f4c82] transition-colors`}
                      onClick={() => toggleKeySelection(key.major)}
                    >
                      {key.major} / {key.minor}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-[#c6c6c6] mb-2 text-center">
                  {selectedKeys.length} keys selected
                </p>
                <div className="flex justify-center">
                  <button
                    className="px-4 py-2 bg-[#1f9fff] rounded hover:bg-[#0f4c82] transition-colors"
                    onClick={() => setShowKeySelector(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Difficulty selection */}
            {!showKeySelector && (
              <>
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl mb-4">Select Difficulty:</h2>
                  <div className="flex space-x-4">
                    <button
                      className={`px-6 py-3 rounded-lg ${
                        difficulty === "easy"
                          ? "bg-[#1f9fff] text-white"
                          : "bg-[#1d1d1b] text-white"
                      } hover:bg-[#16344e] transition-colors`}
                      onClick={() => setDifficulty("easy")}
                    >
                      Easy (3 keys)
                    </button>
                    <button
                      className={`px-6 py-3 rounded-lg ${
                        difficulty === "medium"
                          ? "bg-[#1f9fff] text-white"
                          : "bg-[#1d1d1b] text-white"
                      } hover:bg-[#16344e] transition-colors`}
                      onClick={() => setDifficulty("medium")}
                    >
                      Medium (5 keys)
                    </button>
                    <button
                      className={`px-6 py-3 rounded-lg ${
                        difficulty === "hard"
                          ? "bg-[#1f9fff] text-white"
                          : "bg-[#1d1d1b] text-white"
                      } hover:bg-[#16344e] transition-colors`}
                      onClick={() => setDifficulty("hard")}
                    >
                      Hard (8 keys)
                    </button>
                  </div>
                </div>

                <button
                  className="px-8 py-4 bg-[#1f9fff] rounded-lg text-xl hover:bg-[#0f4c82] transition-colors"
                  onClick={initializeGame}
                  disabled={
                    keySelection === "selected" && selectedKeys.length === 0
                  }
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
                    Remember: A relative minor is 3 half steps below its major
                    key, or at the 6th scale degree.
                  </p>
                  <p className="mt-2 text-sm text-[#a5d9ff]">
                    Fast matches earn bonus points! Match quickly to maximize
                    your score.
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <div className="text-xl">
                Score: <span className="font-bold">{score}</span>
                {matchTimes.length > 0 && (
                  <span className="text-sm ml-2 text-[#a5d9ff]">
                    Last match: +
                    {calculateTimeBonus(matchTimes[matchTimes.length - 1])} time
                    bonus
                  </span>
                )}
              </div>
              <div className="text-xl">
                Time:{" "}
                <span
                  className={`font-bold ${
                    timeLeft < 10 ? "text-[#1f9fff]" : ""
                  }`}
                >
                  {timeLeft}
                </span>
                s
              </div>
              <button
                className="px-4 py-2 bg-[#1d1d1b] rounded hover:bg-[#16344e] transition-colors"
                onClick={resetGame}
              >
                Reset
              </button>
            </div>

            {gameOver && (
              <div className="fixed inset-0 bg-[#1d1d1b] bg-opacity-80 flex items-center justify-center z-10 px-4">
                <div className="bg-[#0f4c82] p-4 md:p-8 rounded-xl max-w-md w-full mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {items.every((item) => item.matched)
                      ? "You Win!"
                      : "Game Over"}
                  </h2>
                  <p className="text-xl mb-2">Final Score: {score}</p>
                  {items.every((item) => item.matched) &&
                    matchTimes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-[#c6c6c6] mb-1">
                          Match Times:
                        </p>
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
                      onClick={initializeGame}
                    >
                      Play Again
                    </button>
                    <button
                      className="px-6 py-3 bg-[#323232] rounded-lg hover:bg-[#16344e] transition-colors border border-[#83a1bc] w-full sm:w-auto"
                      onClick={resetGame}
                    >
                      Change Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modified to always use flex-row layout instead of stacking */}
            <div className="flex flex-row justify-between gap-4 md:gap-8">
              {/* Items container */}
              <div className="flex-1 bg-[#1d1d1b] p-2 md:p-4 rounded-lg">
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-center">
                  {gameMode === "majorToMinor" ? "Major Keys" : "Minor Keys"}
                </h2>
                <div className="space-y-2 md:space-y-4">
                  {items.map(
                    (item) =>
                      !item.matched && (
                        <div
                          key={item.id}
                          id={item.id}
                          className={`p-2 md:p-4 rounded-lg cursor-move shadow-lg hover:shadow-xl transition-shadow text-center text-sm md:text-base ${getKeyTypeStyle(
                            item.type
                          )}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item.id)}
                          onDragEnd={handleDragEnd}
                        >
                          {item.name}{" "}
                          {item.type === "major" ? "Major" : "Minor"}
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Targets container */}
              <div className="flex-1 bg-[#1d1d1b] p-2 md:p-4 rounded-lg">
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-center">
                  {gameMode === "majorToMinor" ? "Minor Keys" : "Major Keys"}
                </h2>
                <div className="space-y-2 md:space-y-4">
                  {targets.map((target) => (
                    <div
                      key={target.id}
                      className={`h-12 md:h-16 rounded-lg text-sm md:text-base
                        ${
                          target.filled
                            ? getKeyTypeStyle(target.type)
                            : "bg-[#16344e] border-2 border-[#83a1bc]"
                        } 
                        flex items-center justify-center transition-colors`}
                      onDragOver={(e) =>
                        !target.filled ? handleDragOver(e) : e.preventDefault()
                      }
                      onDragLeave={(e) =>
                        !target.filled ? handleDragLeave(e) : undefined
                      }
                      onDrop={(e) =>
                        !target.filled ? handleDrop(e, target.id) : undefined
                      }
                    >
                      {target.filled
                        ? "Matched!"
                        : `${target.name} ${
                            target.type === "major" ? "Major" : "Minor"
                          }`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelativeKeysGame;
