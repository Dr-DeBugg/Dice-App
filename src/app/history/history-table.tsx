"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { CountData, HistoryData } from "@/lib/api/requests";

interface HistoryResponse {
  resp: {
    error?: string;
    history: HistoryData[];
    counts: CountData;
  };
}

export default function HistoryTable({ resp }: HistoryResponse) {
  return (
    <Table>
      <TableCaption>A list of the 20 most recent roll results.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Throw date</TableHead>
          <TableHead>Thrown dice</TableHead>
          <TableHead>Individual results</TableHead>
          <TableHead className="text-right">Combined result</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resp.history.map((row) => {
          const date = new Date(row.timestamp);
          const fromattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
          return (
            <TableRow key={row.timestamp}>
              <TableCell className="font-medium">{fromattedDate}</TableCell>
              <TableCell>{row.dice_thrown}</TableCell>
              <TableCell>{row.individual_results}</TableCell>
              <TableCell className="text-right">{row.result_sum}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total number of throws ever: {resp.history[0].id} </TableCell>
          <TableCell>Natural 20 has been rolled {resp.counts.twenty_count} times </TableCell>
          <TableCell className="text-right">
            Natural 100 has been rolled {resp.counts.hundred_count} times{" "}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
