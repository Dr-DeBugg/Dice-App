"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Checkbox } from "@/components/shadcn/checkbox";
import { deleteDie } from "@/lib/api/requests";
import { useToast } from "@/components/shadcn/use-toast";

export type Die = {
  id: string;
  // amount: number;
  // status: "pending" | "processing" | "success" | "failed";
  // email: string;
  name: string;
  sides: number;
};

type DiceReponse = {
  error?: string;
  message?: string;
};

export const columns: ColumnDef<Die>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },
  {
    accessorKey: "sides",
    header: "Sides",
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const die = row.original;
      const { toast } = useToast();

      const deleteAndToast = async () => {
        const resp = await deleteDie(die.id);
        toast({
          variant: resp?.error ? "destructive" : "success",
          description: resp?.error ? resp.error : resp?.message,
        });
      };

      const previewPlaceholder = () => {
        toast({
          description: "Under construction...",
        });
      };

      const rollPlaceholder = () => {
        toast({
          description: "Under construction...",
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}> */}
            <DropdownMenuItem onClick={deleteAndToast}>Delete</DropdownMenuItem>
            <DropdownMenuItem onClick={previewPlaceholder}>
              Preview - not implementd
            </DropdownMenuItem>
            <DropdownMenuItem onClick={rollPlaceholder}>Roll - not implemented</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
