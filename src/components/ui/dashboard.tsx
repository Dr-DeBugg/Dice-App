"use client";

import React from "react";
import { DataTableDice } from "./data-table-dice";
import { Die, getDiceColumns } from "@/components/ui/columns";
import { toast } from "../shadcn/use-toast";
import { deleteDie } from "@/lib/api/requests";
// import { DataTableGroup } from "./data-table-group";

interface DicesResponse {
  resp: {
    error?: string;
    dices: Die[];
  };
}

export default function Dashboard({ resp }: DicesResponse) {
  const onDelete = async (id: string) => {
    const resp = await deleteDie(id);
    toast({
      variant: resp?.error ? "destructive" : "success",
      description: resp?.error ? resp.error : resp?.message,
    });
  };

  const columns = getDiceColumns({ onDelete });

  return (
    <>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <div className="container mx-auto py-10">
          <DataTableDice columns={columns} data={resp.dices} />
        </div>
      </div>
      <div className="py-10" />
    </>
  );
}
