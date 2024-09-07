"use server";

import { Die } from "@/components/ui/dataTable/columns";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { schema } from "../schema";

export type FormState = {
  message: string;
};

export interface HistoryData {
  timestamp: string;
  dice_thrown: string;
  individual_results: string;
  result_sum: number;
  id?: number;
}

function createDiceResponse(dices: Die[], error?: string) {
  return { error, dices };
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
    return { message: "New die added successfully!" };
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
