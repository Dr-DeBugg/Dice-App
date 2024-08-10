"use server";

import { sql } from "@vercel/postgres";
import { NaturalCountType } from "../handleRollComplete";
import { HistoryData } from "./diceRequests";
import { unstable_noStore } from "next/cache";

function createHistoryResponse(history: HistoryData[], counts: CountData, error?: string) {
  return { error, history, counts };
}

export interface CountData {
  twenty_count: number;
  hundred_count: number;
}

export async function getHistory() {
  unstable_noStore();

  try {
    const result = await sql`
      SELECT * FROM history ORDER BY id DESC LIMIT 20
    `;

    const countResult = await sql`
      SELECT twenty_count, hundred_count FROM roll_counts LIMIT 1
    `;

    if (result.rows.length === 0) {
      return createHistoryResponse([], {} as CountData, "No throw result history found.");
    }
    return createHistoryResponse(result.rows as HistoryData[], countResult.rows[0] as CountData);
  } catch (error) {
    console.error("Failed to fetch dices:", error);
    return createHistoryResponse([], {} as CountData, "Internal Server Error");
  }
}

export async function addToHistory(history: HistoryData, naturalCount: NaturalCountType) {
  try {
    await sql`INSERT INTO history (timestamp, dice_thrown, individual_results, result_sum)
      VALUES (${history.timestamp}, ${history.dice_thrown}, ${history.individual_results}, ${history.result_sum})`;
  } catch (error) {
    console.error("Failed to add result to history:", error);
  }

  if (naturalCount.twenty || naturalCount.hundred) {
    try {
      await sql`
          UPDATE roll_counts
          SET twenty_count = twenty_count + ${naturalCount.twenty},
              hundred_count = hundred_count + ${naturalCount.hundred}
        `;
    } catch (error) {
      console.error("Error updating roll counts:", error);
    }
  }
}
