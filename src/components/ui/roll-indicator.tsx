import React, { useCallback, useState } from "react";
import { Button } from "../shadcn/button";
import { HandIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { ThrowDice } from "./throw-dice";
import { Die } from "./columns";

export const RollIndicator = ({ row }: { row: Die }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAnother, setAddAnother] = useState(false);

  const handleSwitchChange = () => {
    setAddAnother(true);

    setTimeout(() => {
      setAddAnother(false);
    }, 250);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(!isModalOpen)}>
        <HandIcon className="h-4 w-4" />
      </Button>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px] p-2 top-[55%]">
          <div className="flex justify-center w-full py-2 px-4">
            <Button variant="ghost" onClick={handleSwitchChange}>
              <PlusCircledIcon className="h-7 w-7" />
            </Button>
          </div>
          <div id="dice-box" className="responsive-dice-box"></div>
          <ThrowDice row={row} addAnotherDie={addAnother} />
        </DialogContent>
      </Dialog>
    </>
  );
};
