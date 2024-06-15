import React from "react";

export const ColorIndicator = ({ color, sides }: { color: string, sides: number }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="text-lg">{sides} sided </div>
        <div
      className="colorIndicator w-7 h-7 border border-gray-300 ml-2 shadow-sm rounded-md"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
};
