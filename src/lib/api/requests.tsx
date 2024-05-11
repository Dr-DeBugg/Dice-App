"use server";

import { Die } from "@/components/ui/columns";
import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

function createDiceResponse(dices: Die[], error?: string) {
  return { error, dices };
}

export async function getAllDices() {
  //TODO: test if this does anything in build version
  unstable_noStore();
  try {
    const result = await sql`SELECT * FROM dices;`;

    if (result.rows.length === 0) {
      return createDiceResponse([], "No dices found.");
    }
    return createDiceResponse(result.rows as Die[]);
  } catch (error) {
    console.error("Failed to fetch dices:", error);
    return createDiceResponse([], "Internal Server Error");
  }
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.name || !data.sides) {
    return nextResponse({ message: "Missing data: name and sides required." }, 404);
  }

  try {
    await sql`INSERT INTO Dices (Id, Name, Sides) VALUES ( gen_random_uuid (), ${data.name}, ${data.sides});`;
  } catch (error) {
    return nextResponse({ error }, 500);
  }

  return nextResponse({ message: `Succesfully added die named ${data.name}` }, 200);
}

export async function deleteDie(id: string) {
  if (!id) return { error: "Missing data: id required." };

  try {
    const result = await sql`DELETE FROM dices WHERE id = ${id}`;

    if (result.rowCount === 1) {
      revalidatePath("");
      return { message: "Successfully removed a die!" };
    }

    return { error: "Die not found or already deleted." };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error." };
  }
}

function nextResponse(response: object, statusCode: number) {
  return NextResponse.json(response, { status: statusCode });
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const name = searchParams.get('name');
//   const sides = searchParams.get('sides');

//   try {
//     if (!name || !sides) throw new Error('Name and Sides required');
//     await sql`INSERT INTO Dices (Id, Name, Sides) VALUES ( gen_random_uuid (), ${name}, ${sides});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const dices = await sql`SELECT * FROM Dices;`;
//   return NextResponse.json({ dices }, { status: 200 });
// }
