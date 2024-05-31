import React from "react";

export const ColorCube = ({ color }: { color: string }) => {
  return (
    <div className="cube">
      <div className="face front" style={{ backgroundColor: color }}></div>
      <div className="face back" style={{ backgroundColor: color }}></div>
      <div className="face right" style={{ backgroundColor: color }}></div>
      <div className="face left" style={{ backgroundColor: color }}></div>
      <div className="face top" style={{ backgroundColor: color }}></div>
      <div className="face bottom" style={{ backgroundColor: color }}></div>
    </div>
  );
};
