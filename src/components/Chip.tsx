import React from "react";

interface ChipProps {
  label: string;
  onDelete: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div className="chip">
      {label}
      <button onClick={onDelete} className="chip-delete">✕</button>
    </div>
  );
};

export default Chip;
