import { Key, Target, KeyPair, GameMode, Difficulty } from "./types";

// All possible keys
export const ALL_KEYS: KeyPair[] = [
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

// Get number of items based on difficulty
export const getItemCount = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "easy":
      return 3;
    case "medium":
      return 5;
    case "hard":
      return 8;
    default:
      return 3;
  }
};

// Initialize game items and targets
export const initializeGameItems = (
  difficulty: Difficulty,
  gameMode: GameMode,
  filteredKeys: KeyPair[]
): { items: Key[]; targets: Target[] } => {
  const itemCount = getItemCount(difficulty);
  const newItems: Key[] = [];
  const newTargets: Target[] = [];

  // Shuffle and take only the number of keys needed for this difficulty
  const shuffledKeys = [...filteredKeys]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(itemCount, filteredKeys.length));

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

  return {
    items: shuffledItems,
    targets: shuffledTargets,
  };
};

// Calculate time-based bonus points
export const calculateTimeBonus = (timeElapsed: number): number => {
  // Convert milliseconds to seconds for calculation
  const secondsElapsed = timeElapsed / 1000;

  // Base formula: faster matches get higher bonuses
  // Max bonus of 5 points for matches under 1 second
  // Bonus decreases as time increases, with minimum of 1 point
  const bonus = Math.max(1, Math.min(5, Math.floor(5 - secondsElapsed)));

  return bonus;
};

// Helper to determine if user is on mobile
export const isMobileDevice = (): boolean => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
};
