import React from "react";
import { KeyPair } from "./types";

interface KeySelectorProps {
  allKeys: KeyPair[];
  selectedKeys: string[];
  toggleKeySelection: (key: string) => void;
  onClose: () => void;
}

const KeySelector: React.FC<KeySelectorProps> = ({
  allKeys,
  selectedKeys,
  toggleKeySelection,
  onClose,
}) => {
  return (
    <div className="bg-[#1d1d1b] p-4 rounded-lg max-w-lg">
      <h3 className="text-xl mb-4 text-center">Select Keys to Practice:</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
        {allKeys.map((key) => (
          <button
            key={key.major}
            className={`px-3 py-2 rounded ${
              selectedKeys.includes(key.major) ? "bg-[#1f9fff]" : "bg-[#16344e]"
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
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default KeySelector;
