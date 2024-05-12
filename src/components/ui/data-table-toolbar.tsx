"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "../shadcn/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 p">
        <h3 className="text-2xl font-bold tracking-tight h-8 px-2">Dices</h3>
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Add new die - not implemented
          <PlusCircledIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
