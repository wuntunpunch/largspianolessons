"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Key,
  Target,
  GameMode,
  KeySelection,
  Difficulty,
  Position,
} from "./types";
import {
  ALL_KEYS,
  calculateTimeBonus,
  initializeGameItems,
  isMobileDevice,
} from "./utils";
import GameSettings from "./GameSettings";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameOver from "./GameOver";

const RelativeKeysGame = (): JSX.Element => {
  // Game state
  const [items, setItems] = useState<Key[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
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
  const [lastMatchBonus, setLastMatchBonus] = useState<number | undefined>(
    undefined
  );

  // Mobile touch state
  const [selectedDragItem, setSelectedDragItem] = useState<string | null>(null);
  const [isMobileDragging, setIsMobileDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<Position>({ x: 0, y: 0 });
  const [currentDragPos, setCurrentDragPos] = useState<Position>({
    x: 0,
    y: 0,
  });

  // Refs for game elements
  const targetRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const dragItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter keys based on selection
  const filteredKeys = ALL_KEYS.filter(
    (key) => keySelection === "all" || selectedKeys.includes(key.major)
  );

  // Initialize game
  const initializeGame = (): void => {
    const { items: newItems, targets: newTargets } = initializeGameItems(
      difficulty,
      gameMode,
      filteredKeys
    );

    setItems(newItems);
    setTargets(newTargets);
    setScore(0);
    setGameOver(false);
    setTimeLeft(60);
    setGameStarted(true);
    setLastMatchTime(Date.now());
    setMatchTimes([]);
    setSelectedDragItem(null);
    setIsMobileDragging(false);
    setLastMatchBonus(undefined);
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

  // Mobile touch handling
  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    if (isMobileDragging) return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();

    // Store both the global position and the position relative to the touched element
    setDragStartPos({ x: touch.clientX, y: touch.clientY });
    setCurrentDragPos({ x: touch.clientX, y: touch.clientY });
    setSelectedDragItem(id);
    setIsMobileDragging(true);
  };

  // Handle the drag movement
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobileDragging || !selectedDragItem) return;

    const touch = e.touches[0];
    setCurrentDragPos({ x: touch.clientX, y: touch.clientY });
  };

  // Handle touch end - drop logic
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobileDragging || !selectedDragItem) return;

    // Check if we're over any target
    const droppedOnTarget = findTargetAtPosition(currentDragPos);

    if (droppedOnTarget) {
      // Check if this is a matching pair
      handleMatch(selectedDragItem, droppedOnTarget);
    }

    // Reset drag state
    setSelectedDragItem(null);
    setIsMobileDragging(false);
  };

  // Function to find which target (if any) the user's finger is over
  const findTargetAtPosition = (position: Position): string | null => {
    // Convert the Map to an Array before iteration to avoid MapIterator issues
    const targetEntries = Array.from(targetRefs.current.entries());

    for (const [targetId, targetElement] of targetEntries) {
      // Skip filled targets
      const target = targets.find((t) => t.id === targetId);
      if (target?.filled) continue;

      const rect = targetElement.getBoundingClientRect();

      if (
        position.x >= rect.left &&
        position.x <= rect.right &&
        position.y >= rect.top &&
        position.y <= rect.bottom
      ) {
        return targetId;
      }
    }

    return null;
  };

  // Handle drag start for mouse
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string
  ): void => {
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.classList.add("opacity-50");
  };

  // Handle drag end for mouse
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove("opacity-50");
  };

  // Handle drag over for mouse
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.currentTarget.classList.add(
      "border-dashed",
      "border-2",
      "border-[#f6f6f6]"
    );
  };

  // Handle drag leave for mouse
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove(
      "border-dashed",
      "border-2",
      "border-[#f6f6f6]"
    );
  };

  // Handle drop for mouse
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
    handleMatch(itemId, targetId);
  };

  // Shared logic for handling matches
  const handleMatch = (itemId: string, targetId: string): void => {
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
      setLastMatchBonus(timeBonus);

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
    setSelectedDragItem(null);
    setIsMobileDragging(false);
    setLastMatchBonus(undefined);
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

  // Container style - touchAction depends on game state
  const containerStyle: React.CSSProperties = {
    touchAction: gameStarted && !gameOver ? "none" : "auto",
    height: gameStarted ? "100vh" : "auto",
    minHeight: "100vh",
    overflowY: gameStarted ? "hidden" : ("auto" as "hidden" | "auto"),
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 relative p-4 text-white py-20"
      ref={containerRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={containerStyle}
    >
      {/* Dark gradient background added to bottom portion */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-gray-100 to-blue-800"></div>

      {/* Main content container with dark background */}
      <div className="bg-[#0f4c82]/60 p-8 rounded-xl shadow-xl relative z-10 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Relative Keys</h1>

        {!gameStarted ? (
          <GameSettings
            gameMode={gameMode}
            setGameMode={setGameMode}
            keySelection={keySelection}
            setKeySelection={setKeySelection}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            showKeySelector={showKeySelector}
            setShowKeySelector={setShowKeySelector}
            selectedKeys={selectedKeys}
            toggleKeySelection={toggleKeySelection}
            allKeys={ALL_KEYS}
            onStartGame={initializeGame}
          />
        ) : (
          <div className="w-full max-w-4xl">
            <GameHeader
              score={score}
              timeLeft={timeLeft}
              onReset={resetGame}
              lastMatchBonus={lastMatchBonus}
            />

            {gameOver && (
              <GameOver
                score={score}
                allMatched={items.every((item) => item.matched)}
                matchTimes={matchTimes}
                onPlayAgain={initializeGame}
                onChangeSettings={resetGame}
              />
            )}

            <GameBoard
              items={items}
              targets={targets}
              gameMode={gameMode}
              isMobileDragging={isMobileDragging}
              selectedDragItem={selectedDragItem}
              currentDragPos={currentDragPos}
              dragItemRefs={dragItemRefs}
              targetRefs={targetRefs}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleTouchStart={handleTouchStart}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RelativeKeysGame;
