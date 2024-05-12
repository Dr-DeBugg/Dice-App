"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/shadcn/checkbox";
import { DataTableRowActions } from "./data-table-row-actions";

export type Die = {
  id: string;
  name: string;
  sides: number;
};

type DiceColumnsProps = {
  onRoll: (id: string) => void;
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
};

export const getDiceColumns = ({
  onDelete,
  onPreview,
  onRoll,
}: DiceColumnsProps): ColumnDef<Die>[] => [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sides",
    header: "Sides",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        rowId={row.original.id}
        onDelete={onDelete}
        onPreview={onPreview}
        onRoll={onRoll}
      />
    ),
  },
];
