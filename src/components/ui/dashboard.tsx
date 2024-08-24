"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableDice } from "./dataTable/data-table-dice";
import { Die, getDiceColumns } from "@/components/ui/dataTable/columns";
import { toast } from "../shadcn/use-toast";
import { deleteDie } from "@/lib/api/diceRequests";

interface DicesResponse {
  diceResp: {
    error?: string;
    dices: Die[];
  };
}

export default function Dashboard({ diceResp }: DicesResponse) {
  const data = useMemo(() => diceResp.dices, []);

  const onDelete = useCallback(async (id: string) => {
    const resp = await deleteDie(id);
    toast({
      variant: resp?.error ? "destructive" : "success",
      description: resp?.error ? resp.error : resp?.message,
    });
  }, []);

  const columns = useMemo(() => getDiceColumns({ onDelete }), []);

  return <DataTableDice columns={columns} data={data} />;
}
