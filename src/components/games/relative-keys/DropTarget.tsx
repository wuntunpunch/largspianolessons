import React from "react";
import { Target } from "./types";

interface DropTargetProps {
  target: Target;
  isMobileDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetId: string) => void;
  setRef: (el: HTMLDivElement | null, id: string) => void;
}

const DropTarget: React.FC<DropTargetProps> = ({
  target,
  isMobileDragging,
  onDragOver,
  onDragLeave,
  onDrop,
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
      key={target.id}
      ref={(el) => setRef(el, target.id)}
      className={`h-12 md:h-16 rounded-lg text-sm md:text-base
        ${
          target.filled
            ? getKeyTypeStyle(target.type)
            : isMobileDragging
            ? "bg-[#16344e] border-2 border-[#83a1bc] border-dashed" // Highlight when dragging on mobile
            : "bg-[#16344e] border-2 border-[#83a1bc]"
        } 
        flex items-center justify-center transition-colors`}
      onDragOver={(e) => (!target.filled ? onDragOver(e) : e.preventDefault())}
      onDragLeave={(e) => (!target.filled ? onDragLeave(e) : undefined)}
      onDrop={(e) => (!target.filled ? onDrop(e, target.id) : undefined)}
    >
      {target.filled
        ? "Matched!"
        : `${target.name} ${target.type === "major" ? "Major" : "Minor"}`}
    </div>
  );
};

export default DropTarget;
