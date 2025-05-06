import React from "react";
import { Key } from "./types";

interface DraggableItemProps {
  item: Key;
  isMobile: boolean;
  selectedDragItem: string | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent, id: string) => void;
  setRef: (el: HTMLDivElement | null, id: string) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  isMobile,
  selectedDragItem,
  onDragStart,
  onDragEnd,
  onTouchStart,
  setRef,
}) => {
  // Get style class for key type
  const getKeyTypeStyle = (type: "major" | "minor"): string => {
    return type === "major"
      ? "bg-[#1f9fff] hover:bg-[#0f4c82] text-[#f6f6f6]"
      : "bg-[#83a1bc] hover:bg-[#16344e] text-[#f6f6f6]";
  };

  return (
    <div
      key={item.id}
      id={item.id}
      ref={(el) => setRef(el, item.id)}
      className={`h-12 md:h-16 p-2 md:p-4 rounded-lg cursor-move shadow-lg hover:shadow-xl transition-shadow text-center text-sm md:text-base border-2 border-[#83a1bc] ${getKeyTypeStyle(
        item.type
      )} ${selectedDragItem === item.id ? "opacity-0" : ""}`}
      draggable={!isMobile}
      onDragStart={(e) => onDragStart(e, item.id)}
      onDragEnd={onDragEnd}
      onTouchStart={(e) => onTouchStart(e, item.id)}
    >
      {item.name} {item.type === "major" ? "Major" : "Minor"}
    </div>
  );
};

export default DraggableItem;
