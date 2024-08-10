"use client";

import React from "react";
import { DataTableDice } from "./data-table-dice";
import { Die, getDiceColumns } from "@/components/ui/columns";
import { toast } from "../shadcn/use-toast";
import { deleteDie } from "@/lib/api/diceRequests";

interface DicesResponse {
  diceResp: {
    error?: string;
    dices: Die[];
  };
}

export default function Dashboard({ diceResp }: DicesResponse) {
  const onDelete = async (id: string) => {
    const resp = await deleteDie(id);
    toast({
      variant: resp?.error ? "destructive" : "success",
      description: resp?.error ? resp.error : resp?.message,
    });
  };

  const columns = getDiceColumns({ onDelete });

  return <DataTableDice columns={columns} data={diceResp.dices} />;
}
