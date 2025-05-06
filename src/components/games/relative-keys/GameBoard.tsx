import React from "react";
import { Key, Target, Position } from "./types";
import DraggableItem from "./DraggableItem";
import DropTarget from "./DropTarget";

interface GameBoardProps {
  items: Key[];
  targets: Target[];
  gameMode: "majorToMinor" | "minorToMajor";
  isMobileDragging: boolean;
  selectedDragItem: string | null;
  currentDragPos: Position;
  dragItemRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  targetRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;

  // Event handlers
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  handleTouchStart: (e: React.TouchEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetId: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  items,
  targets,
  gameMode,
  isMobileDragging,
  selectedDragItem,
  currentDragPos,
  dragItemRefs,
  targetRefs,
  handleDragStart,
  handleDragEnd,
  handleTouchStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}) => {
  // Helper to determine if user is on mobile
  const isMobile = (): boolean => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  // Calculate position for dragged item
  const getDraggedItemStyle = () => {
    if (!isMobileDragging || !selectedDragItem) return {};

    // Find the original drag item element
    const dragItem = dragItemRefs.current.get(selectedDragItem);
    if (!dragItem) return {};

    // Position the dragged item exactly at touch position
    return {
      left: `${currentDragPos.x - 50}px`, // Center horizontally
      top: `${currentDragPos.y - 25}px`, // Center vertically
      position: "fixed" as const,
      zIndex: 1000,
      width: "100px",
      opacity: 0.9,
      pointerEvents: "none" as const,
    };
  };

  // Get style class for key type
  const getKeyTypeStyle = (type: "major" | "minor"): string => {
    return type === "major" ? "bg-[#1f9fff]" : "bg-[#83a1bc]";
  };

  return (
    <>
      {/* Mobile Dragged Item - Only show when dragging on mobile */}
      {isMobileDragging && selectedDragItem && (
        <div
          className={`px-4 py-2 rounded-lg shadow-xl ${
            items.find((item) => item.id === selectedDragItem)?.type === "major"
              ? "bg-[#1f9fff]"
              : "bg-[#83a1bc]"
          } text-white`}
          style={getDraggedItemStyle()}
        >
          {items.find((item) => item.id === selectedDragItem)?.name}
        </div>
      )}

      {/* Game board layout */}
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
                  <DraggableItem
                    key={item.id}
                    item={item}
                    isMobile={isMobile()}
                    selectedDragItem={selectedDragItem}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onTouchStart={handleTouchStart}
                    setRef={(el, id) => {
                      if (el) dragItemRefs.current.set(id, el);
                    }}
                  />
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
              <DropTarget
                key={target.id}
                target={target}
                isMobileDragging={isMobileDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                setRef={(el, id) => {
                  if (el) targetRefs.current.set(id, el);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
