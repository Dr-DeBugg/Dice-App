"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/shadcn/checkbox";
import { DataTableRowActions } from "./data-table-row-actions";
import {  ColorIndicator } from "./color-indicator";
import { RollIndicator } from "./roll-indicator";

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
    header: "Die",
    cell: ({ row }) => <ColorIndicator color={row.original.color} sides={row.original.sides}/>,
  },
  {
    accessorKey: "throw",
    header: "Throw",
    cell: ({ row }) => <RollIndicator row={row.original}/>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row.original} onDelete={onDelete} />,
  },
];
