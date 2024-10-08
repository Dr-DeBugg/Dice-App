"use client";

import { Button } from "../../shadcn/button";
import { HandIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { NewDieDialog } from "../new-die-dialog";
import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { Dialog, DialogContent } from "../../shadcn/dialog";
import { Die } from "./columns";
import { DiceContent } from "../dice-content";

interface DataTableToolbarProps<TData> {
  selectedRows: Die[];
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table, selectedRows }: DataTableToolbarProps<TData>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThrowManyOpen, setIsThrowManyOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const openThrowManyDialog = () => {
    setIsThrowManyOpen(true);
  };

  const closeThrowManyDialog = () => {
    setIsThrowManyOpen(false);
    table.toggleAllRowsSelected(false);
  };

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 p">
        <NewDieDialog closeModal={closeAddModal} isModalOpen={isModalOpen} />
        <Button variant="outline" onClick={openAddModal} className="h-8 px-2 lg:px-3 text-base">
          Add die
          <PlusCircledIcon className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          disabled={selectedRows.length < 2}
          onClick={openThrowManyDialog}
          className={`h-8 px-2 lg:px-3 text-base ${
            selectedRows.length > 1 ? "purple-shimmer" : ""
          }`}
        >
          Throw group
          <HandIcon className="ml-2 h-4 w-4" />
        </Button>
        <Dialog open={isThrowManyOpen} onOpenChange={closeThrowManyDialog}>
          <DialogContent className="sm:max-w-[425px] p-2 top-[55%]">
            <DiceContent rows={selectedRows} setLoading={setLoading} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
