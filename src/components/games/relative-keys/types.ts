// Types for the Relative Keys Game

export interface Key {
  id: string;
  name: string;
  matched: boolean;
  type: "major" | "minor";
}

export interface Target {
  id: string;
  name: string;
  filled: boolean;
  type: "major" | "minor";
}

export type GameMode = "majorToMinor" | "minorToMajor";
export type KeySelection = "all" | "selected";
export type Difficulty = "easy" | "medium" | "hard";

export interface KeyPair {
  major: string;
  minor: string;
}

// Position interface for touch/drag handling
export interface Position {
  x: number;
  y: number;
}
