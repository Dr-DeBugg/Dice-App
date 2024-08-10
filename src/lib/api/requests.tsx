"use server";

import { Die } from "@/components/ui/columns";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { schema } from "../schema";
import { NaturalCountType } from "../handleRollComplete";

function createDiceResponse(dices: Die[], error?: string) {
  return { error, dices };
}

function createHistoryResponse(history: HistoryData[], counts: CountData, error?: string) {
  return { error, history, counts };
}

export interface CountData {
  twenty_count: number;
  hundred_count: number;
}

export interface HistoryData {
  timestamp: string;
  dice_thrown: string;
  individual_results: string;
  result_sum: number;
  id?: number;
}

export async function getHistory() {
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

export async function getAllDices() {
  try {
    const result = await sql`SELECT * FROM dices ORDER BY created_at DESC;`;

    if (result.rows.length === 0) {
      return createDiceResponse([], "No dices found.");
    }
    return createDiceResponse(result.rows as Die[]);
  } catch (error) {
    console.error("Failed to fetch dices:", error);
    return createDiceResponse([], "Internal Server Error");
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

export type FormState = {
  message: string;
};

export async function onSubmitAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Error: Invalid form data",
    };
  }

  const die = parsed.data;

  try {
    await sql`INSERT INTO Dices (Id, Color, Sides) VALUES ( gen_random_uuid (), ${die.color}, ${die.sides});`;
    revalidatePath("/", "page");
    return { message: "Added new die" };
  } catch (e) {
    return { message: "Error: Failed to create die" };
  }
}

export async function deleteDie(id: string) {
  if (!id) return { error: "Missing data: id required." };

  try {
    const result = await sql`DELETE FROM dices WHERE id = ${id}`;

    if (result.rowCount === 1) {
      revalidatePath("/", "page");
      return { message: "Successfully removed a die!" };
    }

    return { error: "Die not found or already deleted." };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error." };
  }
}
