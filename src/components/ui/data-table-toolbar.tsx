"use client";

import { Button } from "../shadcn/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

interface DataTableToolbarProps {
  onAdd: () => void;
}

export function DataTableToolbar({ onAdd }: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 p">
        <h3 className="text-2xl font-bold tracking-tight h-8 px-2">Dices</h3>
        <Button variant="outline" onClick={() => onAdd()} className="h-8 px-2 lg:px-3">
          Add die
          <PlusCircledIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
