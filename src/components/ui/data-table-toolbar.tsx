"use client";

import { Button } from "../shadcn/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { NewDieDialog } from "./new-die-dialog";
import { useState, useCallback } from "react";

export function DataTableToolbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 p">
        <h3 className="text-2xl font-bold tracking-tight h-8 pr-2">Dices</h3>
        <NewDieDialog closeModal={closeModal} isModalOpen={isModalOpen} />
        <Button variant="outline" onClick={openModal} className="h-8 px-2 lg:px-3">
          Add die
          <PlusCircledIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
