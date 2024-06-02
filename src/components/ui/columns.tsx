"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/shadcn/checkbox";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColorCube } from "./color-circle";

export type Die = {
  id: string;
  color: string;
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
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <ColorCube color={row.original.color} />,
  },
  {
    accessorKey: "sides",
    header: "Sides",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        onDelete={onDelete}
        onPreview={onPreview}
        onRoll={onRoll}
      />
    ),
  },
];
