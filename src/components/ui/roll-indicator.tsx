import React, { useCallback, useState } from "react";
import { Button } from "../shadcn/button";
import { HandIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { Die } from "./columns";
import { ThrowDice } from "./throw-dice";
import { Skeleton } from "../shadcn/skeleton";

export const RollIndicator = ({ row }: { row: Die }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const [loading, setLoading] = useState(true);
  const rowArr = Array.from([row]);

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
          <div className="flex justify-center w-full">
            {loading ? (
              <Skeleton className="h-8 w-[50px]" />
            ) : (
              <Button variant="ghost" onClick={handleSwitchChange}>
                <PlusCircledIcon className="h-7 w-7" />
              </Button>
            )}
          </div>
          <div id="dice-box" className="responsive-dice-box"></div>
          <ThrowDice
            rows={rowArr}
            addAnotherDie={addAnother}
            setLoading={setLoading}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
