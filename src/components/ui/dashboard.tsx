"use client";

import React, { useCallback, useMemo } from "react";
import { DataTable } from "./data-table";
import { Die, getDiceColumns } from "@/components/ui/columns";
import { toast } from "../shadcn/use-toast";
import { deleteDie } from "@/lib/api/requests";

interface DicesResponse {
  resp: {
    error?: string;
    dices: Die[];
  };
}

export default function Dashboard({ resp }: DicesResponse) {
  if (resp.error) {
    toast({
      variant: "destructive",
      description: resp.error,
    });
  }

  const onDelete = useCallback(async (id: string) => {
    const resp = await deleteDie(id);
    toast({
      variant: resp?.error ? "destructive" : "success",
      description: resp?.error ? resp.error : resp?.message,
    });
  }, []);

  const onPreview = useCallback((_id: string) => {
    toast({
      description: "Under construction...",
    });
  }, []);

  const onRoll = useCallback((_id: string) => {
    toast({
      description: "Under construction...",
    });
  }, []);

  const columns = useMemo(
    () => getDiceColumns({ onDelete, onPreview, onRoll }),
    [onDelete, onPreview, onRoll]
  );

  return (
    <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={resp.dices} />
      </div>
    </div>
  );
}
