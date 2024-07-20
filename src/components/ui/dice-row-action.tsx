import React from "react";
import { StopIcon } from "@heroicons/react/24/solid";
import { RollIndicator } from "./roll-indicator";
import { Die } from "./columns";

export const DiceRowAction = ({ row, selectedRows }: { row: Die; selectedRows: number }) => {
  return (
    <div className="flex items-center">
      <div style={{ color: row.color }} className="text-lg">
        {row.sides}
      </div>
      <div className="px-2">
        <StopIcon className="w-5 h-5" style={{ color: row.color }}></StopIcon>
      </div>
      <div className="pl-2">
        {selectedRows < 2 ? <RollIndicator row={row} /> : <div className="px-4 h-10 py-2"></div>}
      </div>
    </div>
  );
};
