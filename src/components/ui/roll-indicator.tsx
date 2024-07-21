import React, { useCallback, useState } from "react";
import { Button } from "../shadcn/button";
import { HandIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { Die } from "./columns";
import { Skeleton } from "../shadcn/skeleton";
import { DiceContent } from "./dice-content";

export const RollIndicator = ({ row, disableThrow }: { row: Die; disableThrow: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const [loading, setLoading] = useState(true);
  const rowArr = Array.from([row]);

  const triggerAddDie = () => {
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
      <Button
        disabled={disableThrow}
        variant="outline"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Throw
        <HandIcon className="ml-2 h-4 w-4" />
      </Button>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px] p-2 top-[55%]">
          <div className="flex justify-center w-full">
            {loading ? (
              <Skeleton className="h-8 w-[50px]" />
            ) : (
              <Button variant="ghost" onClick={triggerAddDie}>
                <PlusCircledIcon className="h-7 w-7" />
              </Button>
            )}
          </div>
          <DiceContent
            rows={rowArr}
            addAnotherDie={addAnother}
            setLoading={setLoading}
            loading={loading}
            triggerAddDie={triggerAddDie}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
