import React, { useCallback, useState } from "react";
import { Button } from "../shadcn/button";
import { HandIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { ThrowDice } from "./throw-dice";
import { Die } from "./columns";
import { Switch } from "../shadcn/switch";

export const RollIndicator = ({ row }: { row: Die }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked);

    if (checked) {
      setTimeout(() => {
        setIsSwitchChecked(false);
      }, 500);
    }
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
        <DialogContent className="sm:max-w-[425px] p-2">
          <div className="flex justify-center w-full py-2 px-4">
            <Switch checked={isSwitchChecked} onCheckedChange={handleSwitchChange} />
          </div>
          <div id="dice-box" className="responsive-dice-box"></div>
          <ThrowDice row={row} addAnotherDie={isSwitchChecked} />
        </DialogContent>
      </Dialog>
    </>
  );
};
