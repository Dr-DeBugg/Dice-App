import React from "react";

export const ColorIndicator = ({ color }: { color: string }) => {
  return (
    <div
      className="colorIndicator w-7 h-7 border border-gray-300 ml-1 shadow-sm rounded-md"
      style={{
        backgroundColor: color,
      }}
    />
  );
};
