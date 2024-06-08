import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useCallback, useState } from "react";
import { Die } from "./columns";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { ThrowDice } from "./throw-dice";

type RowActionsProps = {
  row: Die;
  onDelete: (id: string) => void;
};

export function DataTableRowActions({ row, onDelete }: RowActionsProps) {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
        <DropdownMenuTrigger
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(row.id)}>Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={() => openModal()}>Roll</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px] p-2">
          <div id="dice-box" className="responsive-dice-box"></div>
          <ThrowDice row={row} />
        </DialogContent>
      </Dialog>
    </>
  );
}
