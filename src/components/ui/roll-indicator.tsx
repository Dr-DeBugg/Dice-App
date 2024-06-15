import React, { useCallback, useState } from "react";
import { Button } from "../shadcn/button";
import { HandIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { ThrowDice } from "./throw-dice";
import { Die } from "./columns";

export const RollIndicator = ({ row }: { row: Die}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  
  return (
    <>
    <Button
    variant="outline"
    className="hidden h-8 w-8 p-0 lg:flex"
    onClick={() => setIsModalOpen(!isModalOpen)}
  >
    <span className="sr-only">Go to first page</span>
    <HandIcon className="h-4 w-4" />
  </Button>
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px] p-2" >
          <div id="dice-box" className="responsive-dice-box"></div>
          <ThrowDice row={row}/>
        </DialogContent>
      </Dialog>
      </>
  );
};
