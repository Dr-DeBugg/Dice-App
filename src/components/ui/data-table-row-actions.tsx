import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useState } from "react";

type RowActionsProps = {
  rowId: string;
  onRoll: (id: string) => void;
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
};

export function DataTableRowActions({ rowId, onDelete, onPreview, onRoll }: RowActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger onPointerDown={(e) => e.preventDefault()} onClick={() => setOpen(!open)}>
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(rowId)}>Delete</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPreview(rowId)}>
          Preview - not implementd
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoll(rowId)}>Roll - not implemented</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
