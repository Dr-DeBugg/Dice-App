"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/shadcn/checkbox";
import { DataTableRowActions } from "./data-table-row-actions";
import { DiceRowAction } from "./dice-row-action";

export type Die = {
  id: string;
  color: string;
  sides: number;
};

type DiceColumnsProps = {
  onDelete: (id: string) => void;
};

export const getDiceColumns = ({ onDelete }: DiceColumnsProps): ColumnDef<Die>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "die",
    header: "Sides & Color",
    cell: ({ row, table }) => (
      <DiceRowAction
        row={row.original}
        selectedRows={table?.getFilteredSelectedRowModel()?.rows?.length}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row.original} onDelete={onDelete} />,
  },
];
